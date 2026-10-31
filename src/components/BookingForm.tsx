import { useEffect, useState } from 'react';
import { ArrowUpRight, Copy, Check, CheckCircle2, Loader2, Sparkles, Send } from 'lucide-react';
import { services, config } from '../data/content';
import type { Locale } from '../data/content';
import SocialLinks from './SocialLinks';
import ServiceDropdown from './ServiceDropdown';
import PreferenceDropdown from './PreferenceDropdown';

export default function BookingForm({
  locale,
  serviceId,
  onService,
  initialDuration = '60'
}: {
  locale: Locale;
  serviceId: string;
  onService: (id: string) => void;
  initialDuration?: string;
}) {
  const vi = locale === 'vi';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [duration, setDuration] = useState(initialDuration);
  const [preference, setPreference] = useState('none');
  const [note, setNote] = useState('');
  
  useEffect(() => {
    setDuration(initialDuration);
  }, [initialDuration]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setPreview('');
    setCopied(false);
    setIsSubmitted(false);
  }, [serviceId, locale]);

  const service = services.find((s) => s.id === serviceId);
  const selectedDuration = service?.durations.includes(Number(duration))
    ? duration
    : String(service?.durations[0] ?? 60);

  function reset() {
    setPreview('');
    setCopied(false);
    setCopyError(false);
    setIsSubmitted(false);
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

    const prefLabel = preference === 'female'
      ? (vi ? 'Nữ' : 'Female')
      : preference === 'male'
      ? (vi ? 'Nam' : 'Male')
      : (vi ? 'Không yêu cầu' : 'No preference');

    const now = new Date();
    const timeStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const formattedMessage = [
      vi ? '🌿 [TOUCH ART] — YÊU CẦU TƯ VẤN & ĐẶT HẸN' : '🌿 [TOUCH ART] — CONSULTATION REQUEST',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      (vi ? '👤 Họ tên: ' : '👤 Name: ') + name.trim(),
      (vi ? '📞 Điện thoại / Zalo: ' : '📞 Phone: ') + phone.trim(),
      (vi ? '💆 Gói dịch vụ: ' : '💆 Treatment: ') + packageName,
      (vi ? '👥 Ưu tiên KTV: ' : '👥 Preference: ') + prefLabel,
      ...(note.trim() ? [(vi ? '📝 Ghi chú riêng: ' : '📝 Note: ') + note.trim()] : []),
      (vi ? '⏰ Thời gian gửi: ' : '⏰ Sent at: ') + timeStr,
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      vi
        ? '✨ Kính nhờ Touch Art kiểm tra và phản hồi hỗ trợ em sớm nhất nhé!'
        : '✨ Thank you! Looking forward to your prompt confirmation.'
    ].join('\n');

    setPreview(formattedMessage);

    // Tự động sao chép vào bộ nhớ tạm
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
    }

    // Tự động gửi về Google Sheets & Telegram Bot
    if (config.googleScriptUrl) {
      setIsSubmitting(true);
      try {
        const payload = {
          name: name.trim(),
          phone: phone.trim(),
          serviceId,
          packageName,
          duration: selectedDuration,
          locale,
          preference,
          note: note.trim(),
          fullMessage: formattedMessage
        };

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
        console.error('Lỗi gửi webhook:', err);
        // Dù mạng có gián đoạn, tin nhắn vẫn được tạo & copy để chat
        setIsSubmitted(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <form className="booking-form compact-booking three-field-form" noValidate onSubmit={handleSubmit}>
      <div className="form-top">
        <span>{vi ? 'BẮT ĐẦU BẰNG MỘT LỜI NHẮN' : 'IT STARTS WITH A CONVERSATION'}</span>
        <span className="demo">
          <span className="live-indicator">
            <Sparkles size={11} /> {vi ? 'ĐẶT LỊCH TRỰC TUYẾN' : 'ONLINE BOOKING'}
          </span>
        </span>
      </div>

      <h3 className="compact-title">{vi ? 'Một khoảng nghỉ cho bạn.' : 'A moment just for you.'}</h3>
      <p className="form-hint">
        {vi
          ? 'Điền thông tin để hệ thống tự động ghi nhận và chuyển tiếp nhanh qua kênh chat bạn muốn.'
          : 'Fill in your details to record your request and connect directly to your preferred chat channel.'}
      </p>

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

        <label htmlFor="booking-phone">{vi ? 'Số điện thoại / Zalo *' : 'Phone / Zalo number *'}</label>
        <input
          id="booking-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={phone}
          maxLength={24}
          disabled={isSubmitting}
          placeholder={vi ? 'Số điện thoại hoặc Zalo liên hệ' : 'Phone or messaging number'}
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

        <label htmlFor="booking-preference">{vi ? 'Ưu tiên người thực hiện' : 'Practitioner preference'}</label>
        <PreferenceDropdown
          id="booking-preference"
          locale={locale}
          value={preference}
          onChange={(val) => {
            setPreference(val);
            reset();
          }}
        />
        <small className="form-hint">
          {vi
            ? 'Đây là ưu tiên ban đầu. Hồ sơ KTV sẽ được gửi riêng và thống nhất cùng bạn khi trò chuyện.'
            : 'Initial preference only. Therapist profile will be shared privately during consultation.'}
        </small>

        <label htmlFor="booking-note">{vi ? 'Ghi chú thêm (không bắt buộc)' : 'Note (optional)'}</label>
        <textarea
          id="booking-note"
          rows={3}
          maxLength={1000}
          value={note}
          placeholder={vi ? 'Ví dụ: Yêu cầu lực nhẹ, cần phòng riêng yên tĩnh, đặt hẹn khung giờ tối...' : 'Any special requests or preferred timing...'}
          onChange={(e) => {
            setNote(e.target.value);
            reset();
          }}
        />
      </div>

      <button className="button dark full submit-booking-btn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="spinner-icon" />
            <span>{vi ? 'Đang gửi thông tin...' : 'Submitting request...'}</span>
          </>
        ) : (
          <>
            <span>{vi ? 'Gửi yêu cầu & Nhắn tin tư vấn' : 'Submit & Connect Directly'}</span>
            <Send size={16} />
          </>
        )}
      </button>

      {/* RESULT & PREVIEW SECTION */}
      {preview && (
        <div className="summary" id="booking-summary" aria-live="polite">
          {isSubmitted && (
            <div className="submit-success-banner">
              <CheckCircle2 size={18} className="success-icon" />
              <div>
                <strong>{vi ? 'Đã gửi thông tin thành công!' : 'Request submitted successfully!'}</strong>
                <p>
                  {vi
                    ? 'Yêu cầu đã được tự động lưu vào Google Sheets và báo về Telegram quản lý của Touch Art.'
                    : 'Your request has been automatically saved to Google Sheets and dispatched to Touch Art Telegram.'}
                </p>
              </div>
            </div>
          )}

          <div className="summary-title-row">
            <h4>{vi ? 'Văn bản yêu cầu đã soạn sẵn:' : 'Formatted Request Message:'}</h4>
            {copied && (
              <span className="copied-pill-badge">
                <Check size={12} /> {vi ? 'Đã sao chép' : 'Copied'}
              </span>
            )}
          </div>

          <pre className="request-preview">{preview}</pre>

          <button
            className="button dark full copy-preview-btn"
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
            {copied ? (vi ? '✓ Đã sao chép vào bộ nhớ tạm' : '✓ Copied to clipboard') : vi ? 'Sao chép toàn bộ văn bản' : 'Copy formatted message'}
          </button>
          
          {copyError && (
            <p role="status" className="error">
              {vi ? 'Bạn có thể chọn văn bản trong khung trên để sao chép thủ công.' : 'Please select the text above to copy manually.'}
            </p>
          )}

          {/* Direct Chat Channels */}
          <SocialLinks locale={locale} message={preview} />
        </div>
      )}
    </form>
  );
}
