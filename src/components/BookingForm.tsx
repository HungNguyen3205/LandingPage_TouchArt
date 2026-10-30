import { useEffect, useState } from 'react';
import { ArrowUpRight, Copy, Check, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { services, config } from '../data/content';
import type { Locale } from '../data/content';
import { whatsappUrl } from '../lib/booking';
import SocialLinks from './SocialLinks';
import ServiceDropdown from './ServiceDropdown';
import PreferenceDropdown from './PreferenceDropdown';

export default function BookingForm({
  locale,
  serviceId,
  onService, initialDuration = '60'
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
  const [preference,setPreference]=useState('none');
  const [note,setNote]=useState('');
  useEffect(()=>{setDuration(initialDuration)},[initialDuration]);
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
    setIsSubmitted(false);
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
      (vi?'Ưu tiên người thực hiện: ':'Practitioner preference: ')+(preference==='female'?(vi?'Nữ':'Female'):preference==='male'?(vi?'Nam':'Male'):(vi?'Không yêu cầu':'No preference')),
      ...(note.trim()?[(vi?'Ghi chú: ':'Note: ')+note.trim()]:[]),
      vi
        ? 'Đây là yêu cầu tư vấn, chưa phải lịch hẹn đã xác nhận.'
        : 'This is a consultation request, not a confirmed appointment.'
    ].join('\n');

    setPreview(previewText);
    setCopied(false);

  }

  async function sendDirect(){
    if(!preview||isSubmitting||isSubmitted)return;
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
          preference,
          note: (vi?'Ưu tiên: ':'Preference: ')+preference+'\n'+note.trim()
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
        setSubmitError(vi?'Đã thực hiện yêu cầu truyền dữ liệu. Kết nối này chưa cho phép xác minh máy chủ đã lưu hoặc Telegram đã nhận; lịch chưa được xác nhận.':'Transmission was attempted. This connection cannot verify storage or Telegram delivery; your appointment is not confirmed.');
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

  return (
    <form className="booking-form compact-booking three-field-form" noValidate onSubmit={handleSubmit}>
      <div className="form-top">
        <span>{vi ? 'BẮT ĐẦU BẰNG MỘT LỜI NHẮN' : 'IT STARTS WITH A CONVERSATION'}</span>
        <span className="demo">
          {config.googleScriptUrl ? (
            <span className="live-indicator">
              <Sparkles size={11} /> {vi ? 'YÊU CẦU TƯ VẤN' : 'CONSULTATION REQUEST'}
            </span>
          ) : (
            'DEMO'
          )}
        </span>
      </div>

      <h3 className="compact-title">{vi ? 'Một khoảng nghỉ cho bạn.' : 'A moment just for you.'}</h3>
      <p className="form-hint">{vi ? 'Xem lại lời nhắn trước khi chọn kênh liên hệ.' : 'Review your message before choosing a contact channel.'}</p>

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
        <label htmlFor="booking-preference">{vi ? 'Ưu tiên người thực hiện' : 'Practitioner preference'}</label>
        <PreferenceDropdown
          id="booking-preference"
          locale={locale}
          value={preference}
          onChange={val => {
            setPreference(val);
            reset();
          }}
        />
        <small className="form-hint">{vi ? 'Đây là ưu tiên, chưa phải chọn người cụ thể. Hồ sơ được trao đổi riêng khi tư vấn.' : 'This is a preference, not a specific practitioner. Profiles are shared privately in consultation.'}</small>
        <label htmlFor="booking-note">{vi ? 'Ghi chú (không bắt buộc)' : 'Note (optional)'}</label>
        <textarea id="booking-note" rows={3} maxLength={1000} value={note} onChange={e => { setNote(e.target.value); reset(); }} />
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
            <span>{vi ? 'Xem nội dung & chọn kênh chat' : 'Review message & choose chat'}</span>
            <ArrowUpRight size={18} />
          </>
        )}
      </button>

      <p className="form-hint compact-demo">{vi?'Tạo lời nhắn chưa gửi dữ liệu. Bạn chủ động chọn kênh để tiếp tục; lịch chỉ được chốt khi studio xác nhận.':'Preparing a message does not submit your data. Choose a channel to continue; appointments require studio confirmation.'}</p>

      {preview && (
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
          <SocialLinks locale={locale} message={preview}/>
          {config.googleScriptUrl&&<button type="button" className="button dark full" disabled={isSubmitting||isSubmitted} onClick={()=>void sendDirect()}>{isSubmitting?(vi?'Đang truyền yêu cầu…':'Transmitting…'):isSubmitted?(vi?'Đã thử truyền · chưa xác minh':'Transmission attempted · unverified'):(vi?'Gửi qua hệ thống tư vấn':'Send via consultation system')}</button>}
        </div>
      )}
    </form>
  );
}
