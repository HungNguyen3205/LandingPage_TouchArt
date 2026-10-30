import {ArrowUpRight,ArrowLeft,MapPin} from 'lucide-react';
import {pages} from '../data/pages';

const serviceImages: Record<string, string[]> = {
  'body-massage': ['/images/body-client-1.jpg', '/images/body-client-2.jpg'],
  'linga-yoni': ['/images/linga-yoni-1.jpg', '/images/linga-yoni-2.jpg', '/images/linga-yoni-3.jpg'],
  'four-hands': ['/images/four-hands-client.jpg'],
  'private-combo': ['/images/private-combo-client.jpg']
};

export default function DetailPage(){
  const path=location.pathname.endsWith('/')?location.pathname:location.pathname+'/';
  const vi=!path.startsWith('/en/');
  const locale=vi?'vi':'en';
  const page=pages[path];
  document.documentElement.lang=locale;
  document.title=page?`${page.title} | Touch Art`:'404 | Touch Art';
  const other=path.replace(vi?'/vi/':'/en/',vi?'/en/':'/vi/');
  
  // Find matching service images if it's a service detail page
  const serviceKey = Object.keys(serviceImages).find(k => path.includes(`/services/${k}/`));
  const activePhotos = serviceKey ? serviceImages[serviceKey] : null;

  return (
    <>
      <header className="header scrolled">
        <a className="brand" href={`/${locale}/`}>touch<span>art</span><small>THE ART OF FEELING WELL</small></a>
        <nav className="detail-nav">
          <a href={`/${locale}/#treatments`}>{vi?'Dịch vụ':'Treatments'}</a>
          <a href={`/${locale}/#journal`}>{vi?'Góc chia sẻ':'Journal'}</a>
        </nav>
        <div className="header-actions">
          <a className="language" href={other}>{vi?'EN':'VI'}</a>
          <a className="header-book" href={`/${locale}/#booking`}>{vi?'Chọn khoảng nghỉ':'Find your pause'}<ArrowUpRight size={16}/></a>
        </div>
      </header>

      <main className="detail-main wrap">
        <a className="text-link" href={`/${locale}/`}><ArrowLeft size={16}/>{vi?'Trang chủ':'Home'}</a>
        <span className="eyebrow detail-eyebrow">TOUCH ART · MASSAGE & BODYWORK</span>
        <h1>{page?.title??(vi?'Không tìm thấy trang.':'Page not found.')}</h1>
        
        {page ? (
          <>
            <p className="source-status">{vi?'Bản duyệt thiết kế · Hình ảnh thực tế từ studio Touch Art · Giá và dịch vụ chính thức':'Design preview · Real photographs from Touch Art studio · Official services'}</p>
            
            {activePhotos && activePhotos.length > 0 && (
              <div className="detail-service-gallery" style={{display:'flex',flexWrap:'wrap',gap:'16px',margin:'25px 0'}}>
                {activePhotos.map((img, idx) => (
                  <div key={img} style={{flex:'1 1 280px',maxWidth:'450px',borderRadius:'16px',overflow:'hidden',boxShadow:'0 10px 30px #173d2d14',border:'1px solid #c4a87555'}}>
                    <img src={img} alt={`${page.title} - photo ${idx+1}`} style={{width:'100%',height:'260px',objectFit:'cover',display:'block'}}/>
                  </div>
                ))}
              </div>
            )}

            <article className="detail-body">
              {page.body.map((item,i)=>item.kind==='h2'?<h2 key={i}>{item.text}</h2>:item.kind==='h3'?<h3 key={i}>{item.text}</h3>:<p key={i}>{item.text}</p>)}
            </article>

            {path.includes('/locations/')&&<a className="text-link" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=22%20An%20Th%C6%B0%E1%BB%A3ng%206%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng"><MapPin size={17}/>{vi?'Xem địa chỉ trên bản đồ':'View address on map'}<ArrowUpRight size={17}/></a>}
            
            {path.includes('/privacy/')&&<p className="source-material">{vi?'Chính sách quyền riêng tư và bảo mật Touch Art.':'Privacy and data security policy.'}</p>}
            
            <div className="detail-cta">
              <a className="button dark" href={`/${locale}/#booking`}>{vi?'Chọn nhu cầu tư vấn & Đặt lịch ngay':'Prepare your consultation & Book now'}<ArrowUpRight size={17}/></a>
              <p>{vi?'Tư vấn viên sẵn sàng đồng hành cùng bạn.':'Our consultants are always here to listen and assist you.'}</p>
            </div>
          </>
        ) : (
          <p>{vi?'Mời bạn trở về trang chủ để khám phá dịch vụ.':'Return home to explore our treatments.'}</p>
        )}
      </main>

      <footer>
        <div className="wrap footer-bottom">
          <a href={`/${locale}/`}>Touch Art · 22 An Thượng 6 · Đà Nẵng</a>
          <a href={`/${locale}/privacy/`}>{vi?'Quyền riêng tư':'Privacy'}</a>
          <span>DANAVA Solutions</span>
        </div>
      </footer>
    </>
  );
}

