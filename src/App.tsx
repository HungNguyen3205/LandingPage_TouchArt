import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,ArrowDown,Plus,Minus,Menu,X,Leaf,MoveUpRight,MapPin,ChevronLeft,ChevronRight,Maximize2,Sparkles} from 'lucide-react';
import {copy,images,services,config} from './data/content';
import type {Locale} from './data/content';
import EditorialContent from './components/EditorialContent';
import AmbientMusic from './components/AmbientMusic';
import GardenAtmosphere,{GardenBranch} from './components/GardenAtmosphere';
import SocialLinks from './components/SocialLinks';
import BookingForm from './components/BookingForm';

function ServiceCardItem({
  s,
  i,
  locale,
  t,
  vi,
  onSelectService,
  onSelectDuration,
  onOpenModal
}: {
  s: any;
  i: number;
  locale: Locale;
  t: any;
  vi: boolean;
  onSelectService: (id: string) => void;
  onSelectDuration: (d: string) => void;
  onOpenModal: (img: string) => void;
}) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const gallery = s.gallery && s.gallery.length > 0 ? s.gallery : [s.image];
  const currentImg = gallery[activeImgIndex] || s.image;
  const slug = s.id === 'restore' ? 'body-massage' : s.id === 'linga-yoni' ? 'linga-yoni' : s.id === 'bodywork' ? 'four-hands' : 'private-combo';

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev + 1) % gallery.length);
  };

  return (
    <article className="service-card" key={s.id}>
      <div className="service-photo">
        <img 
          src={currentImg} 
          alt={s.name[locale]} 
          loading="lazy"
          onClick={() => onOpenModal(currentImg)}
          style={{ cursor: 'pointer' }}
          title={vi ? 'Nhấn để phóng to ảnh' : 'Click to enlarge image'}
        />
        <span className="service-order-num">0{i + 1}</span>

        {gallery.length > 1 && (
          <>
            {/* Seamless Left / Right Carousel Controls */}
            <button
              type="button"
              className="gallery-nav-btn prev-btn"
              onClick={handlePrev}
              aria-label={vi ? 'Ảnh trước' : 'Previous photo'}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="gallery-nav-btn next-btn"
              onClick={handleNext}
              aria-label={vi ? 'Ảnh kế tiếp' : 'Next photo'}
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>
      <div className="service-info">
        <span className="eyebrow">{s.durations.join(' / ')} {t.minutes}</span>
        <h3>{s.name[locale]}</h3>
        <p style={{ whiteSpace: 'pre-line' }}>{s.description[locale]}</p>
        <a className="text-link" href={`/${locale}/services/${slug}/`}>
          {vi ? 'Xem chi tiết' : 'View treatment'}<ArrowUpRight size={16}/>
        </a>
        <div className="service-bottom">
          <div className="package-choices">
            {s.durations.map((d: number, idx: number) => (
              <a 
                key={d} 
                href="#booking" 
                onClick={() => {
                  onSelectService(s.id);
                  onSelectDuration(String(d));
                }}
              >
                <span>{d} {t.minutes}<strong>{s.prices[idx].toLocaleString(vi ? 'vi-VN' : 'en-US')} ₫</strong></span>
                {t.choose}<ArrowUpRight size={16}/>
              </a>
            ))}
          </div>
          <small>{t.price}</small>
        </div>
      </div>
    </article>
  );
}

export default function App(){
  const [selectedDuration,setSelectedDuration]=useState('60');
  const [locale,setLocale]=useState<Locale>(location.pathname.startsWith('/en')?'en':'vi');
  const [menu,setMenu]=useState(false);
  const [filter,setFilter]=useState('all');
  const [service,setService]=useState('restore');
  const [faq,setFaq]=useState<number|null>(0);
  const [modal,setModal]=useState<string|null>(null);
  const [scrolled,setScrolled]=useState(false);
  const dialog=useRef<HTMLDialogElement>(null);
  const t=copy[locale];
  const vi=locale==='vi';

  useEffect(()=>{
    document.documentElement.lang=locale;
    document.title=vi?'Touch Art — Nghệ thuật chăm sóc cơ thể':'Touch Art — The art of feeling well';
  },[locale,vi]);

  useEffect(()=>{
    const handler=()=>setScrolled(window.scrollY>30);
    window.addEventListener('scroll',handler,{passive:true});
    return()=>window.removeEventListener('scroll',handler);
  },[]);

  useEffect(()=>{
    if(modal){
      dialog.current?.showModal();
      const previous=document.body.style.overflow;
      document.body.style.overflow='hidden';
      return()=>{document.body.style.overflow=previous};
    } else {
      dialog.current?.close();
    }
  },[modal]);

  const questions=vi?[
    'Tôi có cần đăng ký tài khoản không?',
    'Gửi yêu cầu có nghĩa là đã xác nhận lịch?',
    'Tôi có thể chọn người thực hiện không?',
    'Tôi cần biết gì về giá và thay đổi lịch?'
  ]:[
    'Do I need an account?',
    'Does a request confirm my appointment?',
    'Can I choose my practitioner?',
    'What about pricing and schedule changes?'
  ];

  const answers=vi?[
    'Không. Bạn có thể nhắn trực tiếp qua kênh chính thức khi được cập nhật, hoặc dùng form để soạn nhu cầu.',
    'Chưa. Người tư vấn sẽ trao đổi để xác nhận người thực hiện, địa điểm, thời gian và tổng giá.',
    'Bạn có thể chọn ưu tiên nam, nữ hoặc không yêu cầu. Hồ sơ người đang sẵn sàng sẽ được giới thiệu trong cuộc trò chuyện.',
    'Giá, điều kiện thay đổi và hủy lịch cần được xác nhận trước khi đặt. Giá trên web là tham khảo theo bản duyệt; chưa tiếp nhận thanh toán.'
  ]:[
    'No account is required. Message an official channel when available, or use the form to prepare your preferences.',
    'No. A consultant will confirm your practitioner, location, time and total price in conversation.',
    'You may indicate female, male or no preference. Available practitioner profiles will be shared in conversation.',
    'Confirm pricing, rescheduling and cancellation terms before booking. Prices are provisional and this preview accepts no payments.'
  ];

  useEffect(()=>{
    if(!('IntersectionObserver' in window))return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }),{threshold:0.12});
    document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));
    return()=>observer.disconnect();
  },[]);

  const ids=['approach','treatments','experience','booking'];

  return (
    <>
      <GardenAtmosphere locale={locale}/>
      <AmbientMusic locale={locale}/>
      
      <header className={scrolled?'header scrolled':'header'}>
        <a className="brand" href="#home" aria-label="Touch Art home">
          touch<span>art</span><small>THE ART OF FEELING WELL</small>
        </a>
        <nav className={menu?'nav open':'nav'} aria-label={vi?'Điều hướng chính':'Main navigation'}>
          {t.nav.map((n,i)=><a key={n} href={'#'+ids[i]} onClick={()=>setMenu(false)}>{n}</a>)}
          <a href="#community" onClick={()=>setMenu(false)}>{vi?'Cộng đồng':'Community'}</a>
        </nav>
        <div className="header-actions">
          <button className="language" onClick={()=>{const next = vi?'en':'vi'; setLocale(next); window.history.replaceState(null, '', next === 'vi' ? '/' : '/en/');}} aria-label={vi?'Switch to English':'Chuyển sang tiếng Việt'}>
            {vi?'VI':'EN'} <span>/ {vi?'EN':'VI'}</span>
          </button>
          <a className="header-book" href="#booking">{t.book}<ArrowUpRight size={15}/></a>
          <button className="menu-toggle" aria-label={vi?'Menu điều hướng':'Navigation menu'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>
            {menu?<X/>:<Menu/>}
          </button>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero garden-hero" id="home">
          <div className="garden-landscape" aria-hidden="true">
            <img src="/images/hero-client.jpg" alt="Touch Art Wellness" fetchPriority="high"/>
            <div className="garden-mist"/>
            <div className="garden-sunlight"/>
          </div>
          <GardenBranch className="branch-top"/>
          <GardenBranch className="branch-bottom"/>
          <div className="hero-content wrap">
            <span className="eyebrow">{vi ? 'MASSAGE & BODYWORK · CHĂM SÓC RIÊNG TƯ' : 'MASSAGE & BODYWORK · PRIVATE CARE'}</span>
            <h1>{t.hero.split('\n').map((line,i)=><span key={line} className={i===1?'italic':''}>{line}</span>)}</h1>
            <p>
              {vi
                ? 'Dành riêng cho bạn một khoảng thư thái. Chia sẻ nhu cầu qua biểu mẫu, nhắn tin chọn nhà trị liệu yêu thích và đặt hẹn theo cách của bạn.'
                : 'A peaceful pause just for you. Share your preferences through the form, connect privately to choose your therapist, and book on your own terms.'}
            </p>
            <div className="garden-hero-actions">
              <a className="button forest-primary" href="#booking">
                {vi ? 'Chia sẻ nhu cầu & đặt lịch' : 'Share your preferences & book'}
                <ArrowUpRight size={18}/>
              </a>
              
              <a className="hero-explore" href="#treatments">{t.explore} ↓</a>
            </div>
          </div>

          <div className="hero-bottom wrap">
            <a href="#approach" aria-label={vi?'Cuộn xuống':'Scroll down'}><ArrowDown size={18}/></a>
            <span>BODY · MIND · ALL GENDERS WELCOME</span>
          </div>
        </section>

        {/* VALUE STRIP */}
        <div className="value-strip">
          <span><Leaf size={17}/>{vi?'Chăm sóc có sự lắng nghe':'Care that listens'}</span>
          <i/>
          <span>{vi?'Tôn trọng sự riêng tư':'Respect for your privacy'}</span>
          <i/>
          <span>{vi?'Trải nghiệm theo nhu cầu':'An experience shaped around you'}</span>
        </div>

        {/* APPROACH & NOTES SECTION */}
        <section data-reveal className="section approach wrap" id="approach">
          <div className="approach-photo">
            <img src="/images/first-home.svg" alt="Your body is your first home. Treat it with care." loading="lazy"/>
            <span className="photo-label">THE TOUCH OF CARE</span>
            <div className="circle-stamp">
              touch art<br/><Leaf size={26}/><small>with intention</small>
            </div>
          </div>
          <div className="approach-copy treatment-notes">
            <span className="chapter-number">01</span>
            <span className="eyebrow">NOTES · {vi?'LƯU Ý':'NOTES'}</span>
            <h2>{vi?'Chăm sóc bắt đầu từ lắng nghe.':'Care begins with listening.'}</h2>
            <ul>
              <li>{vi?'Tùy chọn Kỹ thuật viên Nam hoặc Nữ theo nhu cầu của bạn.':'Choose your preferred Male or Female Therapist.'}</li>
              <li>{vi?'Phụ thu +100.000đ khi đặt lịch sau 22:00.':'Additional charge of +100,000 VND for bookings after 22:00.'}</li>
              <li>{vi?'Phụ thu +200.000đ khi đặt lịch sau 00:00.':'Additional charge of +200,000 VND for bookings after 00:00.'}</li>
              <li>{vi?'Khuyến khích đặt lịch trước để trải nghiệm của bạn được chuẩn bị chu đáo nhất.':'Advance reservation is highly recommended for the best preparation.'}</li>
            </ul>
            <a className="button champagne" href="#booking">
              {vi?'Nhắn tin tư vấn & Đặt lịch ngay ↗':'Chat for consultation & Book now ↗'}
            </a>
          </div>
        </section>

        {/* TREATMENTS MENU SECTION */}
        <section data-reveal className="treatments section" id="treatments">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <span className="chapter-number">02</span>
                <span className="eyebrow">{t.menu}</span>
                <h2>{t.menuTitle}</h2>
              </div>
              <p>{t.menuText}</p>
            </div>
            
            {/* OFFICIAL TOUCH ART MENU BOARD SHOWCASE */}
            <div className="official-menu-showcase">
              <div 
                className="menu-board-frame" 
                onClick={() => setModal('/images/menu-board.png')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setModal('/images/menu-board.png'); }}
                aria-label={vi ? 'Chạm để phóng to menu chính thức' : 'Tap to enlarge official menu board'}
              >
                <img 
                  src="/images/menu-board.png" 
                  alt={vi ? 'Bảng menu giá Touch Art Massage & Bodywork' : 'Touch Art Massage & Bodywork official menu'} 
                  loading="lazy"
                  className="menu-board-img"
                />
                <div className="menu-board-glow" />
                <span className="menu-zoom-pill">
                  <Maximize2 size={13} /> {vi ? 'Phóng to menu' : 'Enlarge menu'}
                </span>
              </div>
              <p className="menu-tap-hint">
                <Sparkles size={13} className="sparkle-gold" />
                <span>{vi ? 'Chạm để phóng to menu' : 'Tap to enlarge menu'}</span>
              </p>
            </div>

            <div className="filters filter-chips">
              {[
                ['all',t.all],
                ['relax',t.relax],
                ['tantra',t.tantra],
                ['body',t.body],
                ['combo',t.combo]
              ].map(([id,name])=>(
                <button 
                  key={id} 
                  type="button"
                  aria-pressed={filter===id} 
                  className={filter===id?'active':''} 
                  onClick={()=>setFilter(id)}
                >
                  {name}
                </button>
              ))}
            </div>

            <div className="service-grid">
              {services
                .filter(s=>filter==='all'||s.category===filter)
                .map((s,i)=>(
                  <ServiceCardItem 
                    key={s.id} 
                    s={s} 
                    i={i} 
                    locale={locale} 
                    t={t} 
                    vi={vi} 
                    onSelectService={setService} 
                    onSelectDuration={setSelectedDuration} 
                    onOpenModal={setModal}
                  />
                ))}
            </div>
          </div>
        </section>

        {/* SPACE & EXPERIENCE GALLERY (ALL REAL CLIENT PHOTOS) */}
        <section data-reveal className="experience section wrap garden-experience" id="experience">
          <GardenBranch className="experience-branch"/>
          <div className="center-heading">
            <span className="chapter-number">03</span>
            <span className="eyebrow">{t.space}</span>
            <h2>{t.spaceTitle}</h2>
            <p>{t.spaceText}</p>
          </div>
          
          <div className="experience-mosaic-grid">
            {/* Left Tall Feature Card */}
            <div 
              className="mosaic-card mosaic-tall" 
              onClick={() => setModal('/images/space-client.jpg')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setModal('/images/space-client.jpg'); }}
              aria-label={vi ? 'Mở ảnh không gian tĩnh lặng' : 'Open sanctuary photograph'}
            >
              <img 
                src="/images/space-client.jpg" 
                alt={vi ? 'Không gian tĩnh lặng và nến thơm' : 'Sanctuary space and candlelight'} 
                loading="lazy"
                className="mosaic-img"
              />
              <div className="mosaic-overlay-gradient" />
              <div className="mosaic-header-badge">
                <span className="mosaic-tag-pill">{vi ? '01 / KHÔNG GIAN TĨNH LẶNG' : '01 / THE SANCTUARY'}</span>
                <span className="mosaic-zoom-btn" aria-label="Zoom photo"><Plus size={16} /></span>
              </div>
              <div className="mosaic-caption">
                <h4>{vi ? 'Ánh sáng dịu & nến ấm' : 'Gentle light & warm glow'}</h4>
                <p>{vi ? 'Khoảng không gian riêng tư được chăm chút tỉ mỉ, giúp cơ thể thả lỏng tự nhiên.' : 'A peaceful sanctuary where body and mind gently unwind in absolute privacy.'}</p>
              </div>
            </div>

            {/* Right Column Grid */}
            <div className="mosaic-right-col">
              {/* Top Wide Card - 4 hands */}
              <div 
                className="mosaic-card mosaic-wide" 
                onClick={() => setModal('/images/four-hands-client.jpg')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setModal('/images/four-hands-client.jpg'); }}
                aria-label={vi ? 'Mở ảnh nghi thức 4 tay' : 'Open 4-hands ritual photograph'}
              >
                <img 
                  src="/images/four-hands-client.jpg" 
                  alt={vi ? 'Nghi thức 4 tay đồng điệu' : 'Synchronized 4-hands ritual'} 
                  loading="lazy"
                  className="mosaic-img"
                />
                <div className="mosaic-overlay-gradient" />
                <div className="mosaic-header-badge">
                  <span className="mosaic-tag-pill">{vi ? '02 / NGHI THỨC 4 TAY' : '02 / 4-HANDS RITUAL'}</span>
                  <span className="mosaic-zoom-btn" aria-label="Zoom photo"><Plus size={16} /></span>
                </div>
                <div className="mosaic-caption">
                  <h4>{vi ? 'Nhịp điệu hòa quyện' : 'Harmonious rhythm'}</h4>
                  <p>{vi ? 'Hai kỹ thuật viên hòa cùng một nhịp thở nâng đỡ cơ thể.' : 'Two therapists moving in serene unison.'}</p>
                </div>
              </div>

              {/* Bottom 2 Split Cards */}
              <div className="mosaic-sub-grid">
                {/* Bottom Left Card - Mindful Touch */}
                <div 
                  className="mosaic-card mosaic-half" 
                  onClick={() => setModal('/images/body-client-2.jpg')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setModal('/images/body-client-2.jpg'); }}
                  aria-label={vi ? 'Mở ảnh chăm sóc thả lỏng' : 'Open mindful touch photograph'}
                >
                  <img 
                    src="/images/body-client-2.jpg" 
                    alt={vi ? 'Chăm sóc và giải tỏa cơ thể' : 'Mindful muscle care'} 
                    loading="lazy"
                    className="mosaic-img"
                  />
                  <div className="mosaic-overlay-gradient" />
                  <div className="mosaic-header-badge">
                    <span className="mosaic-tag-pill">{vi ? '03 / CHẠM THẢ LỎNG' : '03 / MINDFUL CARE'}</span>
                    <span className="mosaic-zoom-btn" aria-label="Zoom photo"><Plus size={16} /></span>
                  </div>
                  <div className="mosaic-caption compact">
                    <h4>{vi ? 'Giải tỏa tầng sâu' : 'Deep release'}</h4>
                  </div>
                </div>

                {/* Bottom Right Card - Private Combo */}
                <div 
                  className="mosaic-card mosaic-half mosaic-half-accent" 
                  onClick={() => setModal('/images/private-combo-client.jpg')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setModal('/images/private-combo-client.jpg'); }}
                  aria-label={vi ? 'Mở ảnh liệu trình riêng tư' : 'Open private wellness photograph'}
                >
                  <img 
                    src="/images/private-combo-client.jpg" 
                    alt={vi ? 'Liệu trình riêng tư chuyên sâu' : 'Private wellness combo'} 
                    loading="lazy"
                    className="mosaic-img"
                  />
                  <div className="mosaic-overlay-gradient" />
                  <div className="mosaic-header-badge">
                    <span className="mosaic-tag-pill">{vi ? '04 / COMBO RIÊNG TƯ' : '04 / PRIVATE COMBO'}</span>
                    <span className="mosaic-zoom-btn" aria-label="Zoom photo"><Plus size={16} /></span>
                  </div>
                  <div className="mosaic-caption compact">
                    <h4>{vi ? 'Tái tạo năng lượng' : 'Sensory renewal'}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="team-note">
            <Leaf size={35}/>
            <h3>{t.teamTitle}</h3>
            <p>{t.teamText}</p>
          </div>
        </section>

        {/* BOOKING SECTION */}
        <section className="booking section garden-booking" id="booking">
          <GardenBranch className="booking-branch"/>
          <div className="wrap booking-layout">
            <div className="booking-copy">
              <span className="chapter-number">04</span>
              <span className="eyebrow">{t.booking}</span>
              <h2>{t.bookingTitle}</h2>
              <p>{t.bookingText}</p>
              <div className="booking-steps">
                {(vi?['Chọn điều bạn cần','Chia sẻ qua lời nhắn','Cùng xác nhận lịch hẹn']:['Choose your preferences','Start a conversation','Confirm your appointment']).map((s,i)=>(
                  <div key={s}>
                    <span>0{i+1}</span>{s}
                  </div>
                ))}
              </div>
              {config.whatsapp&&<a className="text-link" href={'https://wa.me/'+config.whatsapp.replace('+','')}>WhatsApp <ArrowUpRight size={18}/></a>}
              {config.zalo&&<a className="text-link" href={config.zalo}>Zalo <ArrowUpRight size={18}/></a>}
              <a className="privacy-link" href={`/${locale}/privacy/`}>{t.privacy}</a>
            </div>
            
            <BookingForm locale={locale} serviceId={service} onService={setService} initialDuration={selectedDuration}/>
          </div>
        </section>

        {/* LOCATION SECTION */}
        <section className="section wrap location">
          <MapPin size={28}/>
          <div>
            <span className="eyebrow">{t.location}</span>
            <h2>{t.locationTitle}</h2>
            <p>{t.locationText}</p>
            <a className="text-link" href={`/${locale}/locations/an-thuong/`}>
              {vi?'Khám phá studio':'Explore the studio'}<ArrowUpRight size={16}/>
            </a>
          </div>
          <span className="location-status">{vi?'22 AN THƯỢNG 6 · ĐÀ NẴNG':'22 AN THUONG 6 · DA NANG'}</span>
        </section>

        {/* EDITORIAL CONTENT */}
        <EditorialContent locale={locale}/>

        {/* FAQ SECTION */}
        <section className="faq section wrap">
          <div>
            <span className="eyebrow">GOOD TO KNOW</span>
            <h2>{t.faqTitle}</h2>
          </div>
          <div>
            {questions.map((q,i)=>(
              <div className="faq-item" key={q}>
                <h3>
                  <button aria-expanded={faq===i} aria-controls={'faq-'+i} onClick={()=>setFaq(faq===i?null:i)}>
                    {q}{faq===i?<Minus size={18}/>:<Plus size={18}/>}
                  </button>
                </h3>
                <div id={'faq-'+i} hidden={faq!==i}>
                  <p>{answers[i]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="wrap footer-main">
          <div>
            <a className="brand" href="#home">touch<span>art</span><small>THE ART OF FEELING WELL</small></a>
            <p>{t.footer}</p>
          </div>
          <div>
            <span className="eyebrow">EXPLORE</span>
            <a href={`/${locale}/journal/first-visit/`}>{vi?'Góc chia sẻ':'Journal'}</a>
            <a href={`/${locale}/community/`}>{vi?'Cộng đồng':'Community'}</a>
            {t.nav.map((n,i)=><a key={n} href={'#'+ids[i]}>{n}</a>)}
          </div>
          <div>
            <span className="eyebrow">LET'S CONNECT</span>
            <p>{vi?'Thông tin liên hệ chính thức sẽ được cập nhật.':'Official contact details will be updated.'}</p>
            <a className="privacy-link" href={`/${locale}/privacy/`}>{t.privacy}</a>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© {new Date().getFullYear()} Touch Art · {vi?'Bản xem trước':'Preview'}</span>
          <span>{vi?'Thiết kế bởi':'Designed by'} DANAVA Solutions</span>
        </div>
      </footer>

      <a className={scrolled ? 'mobile-cta is-visible' : 'mobile-cta'} href="#booking">{t.book}<ArrowUpRight size={18}/></a>

      {/* LIGHTBOX DIALOG */}
      <dialog 
        ref={dialog} 
        className={modal==='privacy'?'policy-dialog':'image-dialog'} 
        onCancel={()=>setModal(null)} 
        onClick={e=>{if(e.target===dialog.current)setModal(null)}}
      >
        <button className="dialog-close" onClick={()=>setModal(null)} aria-label={vi?'Đóng':'Close'}><X/></button>
        {modal==='privacy' ? (
          <div>
            <span className="eyebrow">TOUCH ART · PREVIEW</span>
            <h2>{t.privacy}</h2>
            <p>{vi?'Bản xem trước không gửi hoặc lưu yêu cầu đặt lịch lên máy chủ, Google Sheets hay Telegram. Nội dung bạn nhập chỉ được dùng để tạo lời nhắn trong phiên hiện tại.':'This preview does not submit or store booking requests on a server, Google Sheets or Telegram. Your input is only used to compose a message in this session.'}</p>
            <p>{vi?'Khi bạn sao chép, nội dung được ghi vào clipboard trên thiết bị. Nếu mở một kênh liên hệ đã cấu hình, nền tảng đó áp dụng chính sách riêng.':'Copying writes the message to your device clipboard. Configured external messaging channels operate under their own policies.'}</p>
            <p>{vi?'Nội dung mẫu · Cập nhật 2026':'Sample policy · Updated 2026'}</p>
          </div>
        ) : modal && (
          <img src={modal} alt={vi?'Ảnh chi tiết trải nghiệm Touch Art':'Touch Art experience photography'}/>
        )}
      </dialog>
    </>
  );
}
