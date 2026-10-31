import { useState } from 'react';
import { Send, MessageCircle, QrCode, ExternalLink, X, Check, Users } from 'lucide-react';
import { config } from '../data/content';
import type { Locale } from '../data/content';

interface SocialChannel {
  id: string;
  name: string;
  badge: string;
  url: string;
  qrImage?: string;
  iconType: 'telegram' | 'whatsapp' | 'zalo' | 'facebook' | 'wechat' | 'kakao' | 'community';
}

export default function SocialLinks({
  locale,
  message = '',
  community = false
}: {
  locale: Locale;
  message?: string;
  community?: boolean;
}) {
  const vi = locale === 'vi';
  const [activeQr, setActiveQr] = useState<{ name: string; image: string } | null>(null);
  const [justCopied, setJustCopied] = useState(false);

  if (community) {
    return (
      <div className="social-block community-social-block">
        <a
          href={config.community}
          target="_blank"
          rel="noopener noreferrer"
          className="social-channel-card community-channel"
        >
          <div className="channel-icon-wrap community-icon">
            <Users size={18} />
          </div>
          <div className="channel-info">
            <strong>{vi ? 'Cộng đồng Touch Art' : 'Touch Art Community'}</strong>
            <small>{vi ? 'Tham gia trao đổi & cập nhật ưu đãi' : 'Join discussions & updates'}</small>
          </div>
          <ExternalLink size={14} className="channel-external-icon" />
        </a>
      </div>
    );
  }

  const channels: SocialChannel[] = [
    {
      id: 'telegram',
      name: 'Telegram',
      badge: '@DNXspace',
      url: config.telegram,
      qrImage: config.qrImages?.telegram,
      iconType: 'telegram'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      badge: vi ? 'Trò chuyện ngay' : 'Chat now',
      url: config.whatsapp,
      iconType: 'whatsapp'
    },
    {
      id: 'zalo',
      name: 'Zalo',
      badge: 'The Art Of Touch',
      url: config.zalo,
      qrImage: config.qrImages?.zalo,
      iconType: 'zalo'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      badge: 'Fanpage Touch Art',
      url: config.facebook,
      iconType: 'facebook'
    },
    {
      id: 'wechat',
      name: 'WeChat',
      badge: 'Da Nang Relax & Spa',
      url: config.wechat,
      qrImage: config.qrImages?.wechat,
      iconType: 'wechat'
    },
    {
      id: 'kakao',
      name: 'KakaoTalk',
      badge: 'Kinga-Queeni-Massa',
      url: config.kakao,
      qrImage: config.qrImages?.kakao,
      iconType: 'kakao'
    }
  ];

  async function handleChannelClick(channel: SocialChannel) {
    if (message) {
      try {
        await navigator.clipboard.writeText(message);
        setJustCopied(true);
        setTimeout(() => setJustCopied(false), 3500);
      } catch (err) {
        console.warn('Could not copy to clipboard:', err);
      }
    }
  }

  return (
    <div className="social-block">
      <div className="social-header">
        <h4>{vi ? 'Chọn kênh nhắn tin trực tiếp' : 'Choose a direct chat channel'}</h4>
        <span className="social-hint-badge">
          {justCopied ? (
            <span className="copied-pill">
              <Check size={12} /> {vi ? 'Đã sao chép tin nhắn!' : 'Message copied!'}
            </span>
          ) : (
            vi ? 'Chạm để nhảy thẳng vào ô chat' : 'Tap to open chat directly'
          )}
        </span>
      </div>

      <div className="social-grid">
        {channels.map((ch) => (
          <div key={ch.id} className={`social-channel-item channel-${ch.id}`}>
            <a
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-channel-card"
              onClick={() => handleChannelClick(ch)}
              title={`${vi ? 'Nhắn tin qua' : 'Chat via'} ${ch.name}`}
            >
              <div className={`channel-icon-wrap icon-${ch.id}`}>
                {ch.id === 'telegram' ? <Send size={16} /> : <MessageCircle size={16} />}
              </div>
              <div className="channel-info">
                <strong>{ch.name}</strong>
                <small>{ch.badge}</small>
              </div>
              <ExternalLink size={13} className="channel-external-icon" />
            </a>

            {ch.qrImage && (
              <button
                type="button"
                className="channel-qr-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveQr({ name: ch.name, image: ch.qrImage! });
                }}
                aria-label={`${vi ? 'Mở mã QR' : 'Open QR code for'} ${ch.name}`}
                title={vi ? 'Xem mã QR' : 'View QR code'}
              >
                <QrCode size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      <p className="social-footer-hint">
        {vi
          ? '💡 Mẹo: Khi chạm vào kênh, nội dung yêu cầu sẽ được tự động sao chép để bạn chỉ cần dán (Paste) vào ô chat và gửi ngay.'
          : '💡 Tip: Tapping a channel copies your formatted request so you can simply paste into the chat and send immediately.'}
      </p>

      {/* QR Code Lightbox Modal */}
      {activeQr && (
        <div
          className="qr-lightbox-backdrop"
          onClick={() => setActiveQr(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="qr-lightbox-card" onClick={(e) => e.stopPropagation()}>
            <div className="qr-lightbox-header">
              <h4>{vi ? `Mã QR kết nối ${activeQr.name}` : `Connect via ${activeQr.name} QR`}</h4>
              <button
                type="button"
                className="qr-close-btn"
                onClick={() => setActiveQr(null)}
                aria-label={vi ? 'Đóng' : 'Close'}
              >
                <X size={18} />
              </button>
            </div>
            <div className="qr-lightbox-image-wrap">
              <img src={activeQr.image} alt={`${activeQr.name} QR Code`} />
            </div>
            <p className="qr-lightbox-hint">
              {vi
                ? 'Mở ứng dụng trên điện thoại và quét mã QR để bắt đầu cuộc trò chuyện riêng tư.'
                : 'Open the app on your phone and scan the QR code to start a private conversation.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
