import { useEffect, useState } from 'react';
import { ArrowUpRight, Copy, Check, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { services, config } from '../data/content';
import type { Locale } from '../data/content';
import { whatsappUrl } from '../lib/booking';
import ServiceDropdown from './ServiceDropdown';

export default function BookingForm({
  locale,
  serviceId,
  onService
}: {
  locale: Locale;
  serviceId: string;
  onService: (id: string) => void;
}) {
  const vi = locale === 'vi';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [duration, setDuration] = useState('60');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    setPreview('');
    setCopied(false);
  }, [serviceId, locale]);

  const service = services.find((s) => s.id === serviceId);
  const selectedDuration = service?.durations.includes(Number(duration))
    ? duration
    : String(service?.durations[0] ?? 60);
  const whatsapp = whatsappUrl(config.whatsapp, preview);

  function reset() {
    setPreview('');
    setCopied(false);
    setCopyError(false);
    setSubmitError('');
  }

  function handleResetAll() {
    setName('');
    setPhone('');
    setIsSubmitted(false);
    setIsSubmitting(false);
    reset();
  }

  const packageName = service
    ? service.name[locale] + ' · ' + selectedDuration + (vi ? ' phút' : ' min')
    : (vi ? 'Nhờ tư vấn gói phù hợp' : 'Help me choose a treatment');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim() || name.trim().length > 100) next.name = 'name';
    if (
      !/^\+?[\d\s().-]{8,24}$/.test(phone.trim()) ||
      phone.replace(/\D/g, '').length < 8 ||
      phone.replace(/\D/g, '').length > 15
    ) {
      next.phone = 'phone';
    }
    if (!service && serviceId !== 'consult') next.service = 'service';

    setErrors(next);
    if (Object.keys(next).length) {
      setPreview('');
      document.getElementById('booking-' + Object.keys(next)[0])?.focus();
      return;
    }

    const previewText = [
      vi ? 'YÊU CẦU TƯ VẤN TOUCH ART' : 'TOUCH ART CONSULTATION REQUEST',
      (vi ? 'Họ tên: ' : 'Name: ') + name.trim(),
      (vi ? 'Số điện thoại: ' : 'Phone: ') + phone.trim(),
      (vi ? 'Gói dịch vụ quan tâm: ' : 'Treatment of interest: ') + packageName,
      vi
        ? 'Đây là yêu cầu tư vấn, chưa phải lịch hẹn đã xác nhận.'
        : 'This is a consultation request, not a confirmed appointment.'
    ].join('\n');

    setPreview(previewText);
    setCopied(false);

    // Nếu đã cấu hình URL Google Apps Script Web App -> Gửi dữ liệu về Google Sheets & Telegram Bot
    if (config.googleScriptUrl) {
      setIsSubmitting(true);
      setSubmitError('');
      try {
        const payload = {
          name: name.trim(),
          phone: phone.trim(),
          serviceId,
          packageName,
          duration: selectedDuration,
          locale,
          note: 'Yêu cầu tư vấn gửi từ Touch Art Landing Page'
        };

        // Google Apps Script Web App yêu cầu mode: 'no-cors' khi gọi từ client
        await fetch(config.googleScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });

        setIsSubmitted(true);
      } catch (err) {
        console.error('Lỗi khi gửi yêu cầu tư vấn:', err);
        setSubmitError(
          vi
            ? 'Không thể gửi trực tiếp lúc này. Bạn có thể sao chép lời nhắn bên dưới để gửi qua Zalo/WhatsApp.'
            : 'Could not send directly at this time. You can copy the message below to contact us.'
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  // Giao diện khi đã gửi thành công
  if (isSubmitted) {
    return (
      <div className="booking-form compact-booking three-field-form booking-success-card" role="region" aria-live="polite">
        <div className="success-icon-badge">
          <CheckCircle2 size={38} className="success-check-icon" />
        </div>
        <h3 className="compact-title success-heading">
          {vi ? 'Yêu cầu tư vấn đã được gửi!' : 'Your request has been received!'}
        </h3>
        <p className="form-hint success-hint">
          {vi
            ? `Cảm ơn bạn. Thông tin đã được chuyển đến đội ngũ Touch Art và Telegram. Chúng tôi sẽ liên hệ lại với bạn qua số điện thoại ${phone} trong thời gian sớm nhất.`
            : `Thank you. Your request has been sent to the Touch Art team. We will be in touch with you shortly at ${phone}.`}
        </p>

        <div className="submitted-summary-box">
          <div className="summary-row">
            <span className="summary-label">{vi ? 'Họ tên:' : 'Full name:'}</span>
            <strong className="summary-val">{name}</strong>
          </div>
          <div className="summary-row">
            <span className="summary-label">{vi ? 'Số điện thoại:' : 'Phone:'}</span>
            <strong className="summary-val">{phone}</strong>
          </div>
          <div className="summary-row">
            <span className="summary-label">{vi ? 'Gói quan tâm:' : 'Treatment:'}</span>
            <strong className="summary-val">{packageName}</strong>
          </div>
        </div>

        <button
          className="button dark full"
          type="button"
          onClick={handleResetAll}
        >
          {vi ? 'Gửi yêu cầu tư vấn khác' : 'Send another request'}
        </button>
      </div>
    );
  }

  return (
    <form className="booking-form compact-booking three-field-form" noValidate onSubmit={handleSubmit}>
      <div className="form-top">
        <span>{vi ? 'BẮT ĐẦU BẰNG MỘT LỜI NHẮN' : 'IT STARTS WITH A CONVERSATION'}</span>
        <span className="demo">
          {config.googleScriptUrl ? (
            <span className="live-indicator">
              <Sparkles size={11} /> {vi ? 'KẾT NỐI TRỰC TIẾP' : 'CONNECTED'}
            </span>
          ) : (
            'DEMO'
          )}
        </span>
      </div>

      <h3 className="compact-title">{vi ? 'Một khoảng nghỉ cho bạn.' : 'A moment just for you.'}</h3>
      <p className="form-hint">{vi ? 'Để lại 3 thông tin để bắt đầu cuộc trò chuyện.' : 'Just three details to start the conversation.'}</p>

      <div className="three-fields">
        <label htmlFor="booking-name">{vi ? 'Họ tên *' : 'Full name *'}</label>
        <input
          id="booking-name"
          autoComplete="name"
          required
          value={name}
          maxLength={100}
          disabled={isSubmitting}
          placeholder={vi ? 'Họ và tên của bạn' : 'Your full name'}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          onChange={(e) => {
            setName(e.target.value);
            reset();
          }}
        />
        {errors.name && (
          <p className="error" id="name-error">
            {vi ? 'Vui lòng nhập họ tên.' : 'Please enter your name.'}
          </p>
        )}

        <label htmlFor="booking-phone">{vi ? 'Số điện thoại *' : 'Phone number *'}</label>
        <input
          id="booking-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={phone}
          maxLength={24}
          disabled={isSubmitting}
          placeholder={vi ? 'Số điện thoại liên hệ' : 'Your phone number'}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          onChange={(e) => {
            setPhone(e.target.value);
            reset();
          }}
        />
        {errors.phone && (
          <p className="error" id="phone-error">
            {vi ? 'Vui lòng nhập số điện thoại hợp lệ.' : 'Please enter a valid phone number.'}
          </p>
        )}

        <label htmlFor="booking-service">{vi ? 'Gói dịch vụ quan tâm *' : 'Treatment of interest *'}</label>
        <ServiceDropdown
          locale={locale}
          serviceId={serviceId}
          selectedDuration={selectedDuration}
          hasError={!!errors.service}
          onSelect={(id, d) => {
            onService(id);
            setDuration(d);
            reset();
          }}
        />
        {errors.service && (
          <p className="error">{vi ? 'Vui lòng chọn gói dịch vụ.' : 'Please choose a treatment.'}</p>
        )}
      </div>

      {submitError && <p className="error submit-error-banner">{submitError}</p>}

      <button className="button dark full submit-booking-btn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="spinner-icon" />
            <span>{vi ? 'Đang gửi yêu cầu...' : 'Sending request...'}</span>
          </>
        ) : (
          <>
            <span>{vi ? 'Gửi yêu cầu tư vấn' : 'Send consultation request'}</span>
            <ArrowUpRight size={18} />
          </>
        )}
      </button>

      <p className="form-hint compact-demo">
        {config.googleScriptUrl
          ? vi
            ? 'Thông tin sẽ được gửi an toàn về Google Sheets & Telegram Bot quản trị viên để hỗ trợ bạn sớm nhất.'
            : 'Details will be securely transmitted to our Google Sheets & admin Telegram Bot to assist you promptly.'
          : vi
            ? 'Bản duyệt chuẩn bị sẵn nội dung. Sau khi kết nối Google Apps Script, thông tin sẽ tự động lưu về Google Sheets & Telegram Bot (-5408040804).'
            : 'Preview ready. Once connected with Google Apps Script, details are automatically saved to Google Sheets & Telegram Bot (-5408040804).'}
      </p>

      {preview && !config.googleScriptUrl && (
        <div className="summary" aria-live="polite">
          <h3>{vi ? 'Nội dung yêu cầu' : 'Your request'}</h3>
          <pre className="request-preview">{preview}</pre>
          <button
            className="button dark full"
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(preview);
                setCopied(true);
                setCopyError(false);
              } catch {
                setCopyError(true);
              }
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? (vi ? 'Đã sao chép' : 'Copied') : vi ? 'Sao chép lời nhắn' : 'Copy message'}
          </button>
          {copyError && (
            <p role="status">
              {vi ? 'Chọn nội dung trên để sao chép thủ công.' : 'Select the text above to copy it manually.'}
            </p>
          )}
          {whatsapp && (
            <a className="button" href={whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp <ArrowUpRight size={16} />
            </a>
          )}
          {config.zalo && (
            <a className="button" href={config.zalo} target="_blank" rel="noopener noreferrer">
              Zalo <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      )}
    </form>
  );
}
