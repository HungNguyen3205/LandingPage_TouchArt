import {ArrowUpRight, Clock, BookOpen, Sparkles} from 'lucide-react';
import SocialLinks from './SocialLinks';
import type {Locale} from '../data/content';

export default function EditorialContent({locale}:{locale:Locale}){
  const vi = locale === 'vi';
  
  const articles = [
    {
      slug: 'first-visit',
      tag: vi ? 'CHĂM SÓC · LẮNG NGHE' : 'BEFORE YOUR VISIT',
      readTime: vi ? '2 phút đọc' : '2 min read',
      title: vi ? 'Lần đầu đến Touch Art: nên chia sẻ điều gì?' : 'Your first visit: what should you share?',
      text: vi 
        ? 'Một vài thông tin nhỏ về thể trạng và mong muốn giúp cuộc tư vấn rõ ràng, cho một buổi chăm sóc trọn vẹn và vừa vặn nhất với bạn.' 
        : 'A few simple details about your body and preferences help shape a thoughtful consultation and personalized treatment.',
      image: '/images/detail.jpg'
    },
    {
      slug: 'choose-duration',
      tag: vi ? 'NHỊP ĐIỆU · THỜI LƯỢNG' : 'FIND YOUR PACE',
      readTime: vi ? '2 phút đọc' : '2 min read',
      title: vi ? '60 hay 90 phút: chọn theo nhịp của bạn.' : '60 or 90 minutes: find your own pace.',
      text: vi 
        ? 'Gợi ý lựa chọn thời lượng dựa trên quỹ thời gian và nhu cầu thực sự, không vội vàng và không cần một công thức cố định.' 
        : 'Thoughtful guidance on choosing your duration without rushing, tailored to your own rhythm rather than a fixed formula.',
      image: '/images/garden.jpg'
    }
  ];

  return (
    <>
      {/* THE TOUCH ART JOURNAL */}
      <section className="section wrap" id="journal" data-reveal>
        <div className="journal-header">
          <div className="journal-header-left">
            <span className="chapter-number">05</span>
            <span className="eyebrow journal-eyebrow">
              <Sparkles size={13} className="sparkle-icon"/> {vi ? 'GÓC CHIA SẺ & CẢM NGHIỆM' : 'THE TOUCH ART JOURNAL'}
            </span>
            <h2 className="journal-main-title">
              {vi ? <>Một chút <span className="italic-champagne">hiểu mình</span> hơn.</> : <>A little more <span className="italic-champagne">in tune</span> with yourself.</>}
            </h2>
          </div>
          <div className="journal-header-right">
            <p className="journal-subtitle">
              {vi 
                ? 'Những ghi chép nhỏ để cuộc trò chuyện thêm phần rõ ràng, và trải nghiệm chạm vào cơ thể thêm phần gần gũi, an tâm.' 
                : 'Small reflections and mindful insights for a clearer conversation and a deeply personal, comforting experience.'}
            </p>
          </div>
        </div>

        <div className="journal-card-grid">
          {articles.map((a) => (
            <a 
              className="editorial-magazine-card" 
              href={`/${locale}/journal/${a.slug}/`} 
              key={a.slug}
            >
              <div className="card-media-wrapper">
                <img 
                  src={a.image} 
                  alt={a.title} 
                  loading="lazy" 
                  className="card-media-img"
                />
                <div className="media-overlay-gradient"/>
                <div className="media-badges">
                  <span className="journal-badge tag-badge">{a.tag}</span>
                  <span className="journal-badge time-badge">
                    <Clock size={11}/> {a.readTime}
                  </span>
                </div>
              </div>

              <div className="card-body-content">
                <h3 className="card-article-title">{a.title}</h3>
                <p className="card-article-excerpt">{a.text}</p>
                <div className="card-footer-action">
                  <span className="read-more-text">
                    {vi ? 'Đọc bài viết' : 'Read article'}
                  </span>
                  <span className="action-circle-icon">
                    <ArrowUpRight size={16}/>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* COMMUNITY SECTION */}
      <section className="wrap community-section" id="community">
        <div>
          <span className="eyebrow">{vi ? 'KẾT NỐI & ĐỒNG HÀNH' : 'STAY A LITTLE LONGER'}</span>
          <h2>{vi ? 'Giữ một kết nối thân quen.' : 'Stay connected, in your own way.'}</h2>
        </div>
        <div>
          <p>
            {vi 
              ? 'Tin từ studio, hoạt động chăm sóc bản thân và những buổi gặp gỡ tĩnh lặng. Bạn chủ động chọn tham gia; khách đặt lịch không tự động bị thêm vào nhóm.' 
              : 'Studio news, self-care activities and quiet gatherings. Joining is always your choice; booking never automatically adds you to a group.'}
          </p>
          <a className="text-link" href={`/${locale}/community/`}>
            {vi ? 'Tìm hiểu cộng đồng' : 'Explore our community'} <ArrowUpRight size={18}/>
          </a>
          <SocialLinks locale={locale} community/>
        </div>
      </section>

      {/* CONTACT CHANNELS */}
      <section className="wrap section contact-section" id="contact">
        <div className="contact-channels">
          <strong>{vi ? 'Liên lạc theo cách của bạn.' : 'Connect your way.'}</strong>
          <div className="contact-list">
            <SocialLinks locale={locale}/>
          </div>
        </div>
        <small>
          {vi 
            ? 'Các kênh kết nối chính thức của Touch Art. Bạn có thể nhắn tin trực tiếp để nhận tư vấn riêng tư.' 
            : 'Touch Art official communication channels. You can message us anytime for private consultation.'}
        </small>
      </section>
    </>
  );
}

