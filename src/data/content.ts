export type Locale = 'vi' | 'en';
const envGoogleScriptUrl = typeof import.meta !== 'undefined' && (import.meta as any).env ? ((import.meta as any).env.VITE_GOOGLE_SCRIPT_URL || '') : '';
export const config = {
  demo: true,
  whatsapp: '',
  zalo: '',
  email: '',
  address: '22 An Thượng 6, Mỹ An, Ngũ Hành Sơn, Đà Nẵng',
  telegram: '',
  messenger: '',
  wechat: '',
  kakao: '',
  phone: '',
  community: 'https://touchart.vn/community',
  googleScriptUrl: envGoogleScriptUrl || 'https://script.google.com/macros/s/AKfycbyoDAEiAwH-5ETu_mLZ5eKE-7zylalRLMzjlLifvdM7A-9NQk7EEe0Hop048AlJX1w0/exec'
};

export const images = {
  hero: '/images/hero-client.jpg',
  detail: '/images/body-client-1.jpg',
  room: '/images/linga-yoni-2.jpg',
  ritual: '/images/four-hands-client.jpg',
  tantra: '/images/linga-yoni-1.jpg',
  combo: '/images/private-combo-client.jpg'
};

export const services = [
  {
    id: 'restore',
    name: {
      vi: 'Body Massage · Massage Toàn Thân',
      en: 'Body Massage'
    },
    category: 'relax',
    description: {
      vi: 'Thả lỏng cơ thể. Dành một khoảng nghỉ cho mình. Massage toàn thân với nhịp chạm nhẹ nhàng và lực điều chỉnh theo sự thoải mái của bạn.',
      en: 'Let your body unwind. Take a moment for yourself. A full-body massage with gentle, flowing movements and pressure tailored to your comfort.'
    },
    durations: [60, 90],
    prices: [500000, 700000],
    image: '/images/body-client-1.jpg',
    gallery: ['/images/body-client-1.jpg', '/images/body-client-2.jpg']
  },
  {
    id: 'linga-yoni',
    name: {
      vi: 'Linga & Yoni Ritual — Massage Linga & Yoni',
      en: 'Linga & Yoni Ritual'
    },
    category: 'tantra',
    description: {
      vi: 'Khơi nguồn năng lượng gốc. Chạm vào linh thiêng. Khoảng không gian riêng tư dành cho cả Nam và Nữ, nơi năng lượng cơ thể được xoa dịu và trân trọng đúng nghĩa theo triết lý Tantra cổ xưa. Qua những nhịp chạm tinh tế, an toàn và hoàn toàn bình đẳng, gói trị liệu giúp bạn giải tỏa stress, khơi dậy sinh lực và kết nối sâu sắc với chính cơ thể mình.',
      en: 'Awaken your primal energy. Touch the sacred. A private space for both Men and Women, where body energy is soothed and truly honored according to ancient Tantra philosophy. Through delicate, safe, and balanced touches, this therapy helps release stress, revive vitality, and deeply reconnect with your inner self.'
    },
    durations: [60, 90],
    prices: [1000000, 1200000],
    image: '/images/linga-yoni-1.jpg',
    gallery: ['/images/linga-yoni-1.jpg', '/images/linga-yoni-2.jpg', '/images/linga-yoni-3.jpg']
  },
  {
    id: 'bodywork',
    name: {
      vi: '4 Hand Experience · Massage 4 Tay',
      en: '4 Hand Experience · Four Hands'
    },
    category: 'body',
    description: {
      vi: 'Liệu pháp xa xỉ kết hợp đồng thời từ 4 bàn tay của hai kỹ thuật viên chuyên nghiệp di chuyển mượt mà trên cơ thể bạn. Khi các nhịp chạm song hành cùng lúc, tâm trí bạn sẽ hoàn toàn buông bỏ mọi căng thẳng để đón nhận dòng năng lượng tự nhiên được lưu thông mạnh mẽ nhất.',
      en: 'An ultra-luxury therapy featuring four hands from two professional therapists moving in perfect harmony across your body. As the synchronized touches blend together, your mind fully lets go of stress, allowing the natural flow of energy to awaken and circulate freely.'
    },
    durations: [60, 90],
    prices: [1700000, 2100000],
    image: '/images/four-hands-client.jpg',
    gallery: ['/images/four-hands-client.jpg']
  },
  {
    id: 'private-combo',
    name: {
      vi: 'Private Combo · Trải Nghiệm Riêng Tư',
      en: 'Private Combo Experience'
    },
    category: 'combo',
    description: {
      vi: 'Hành trình chăm sóc cao cấp đưa bạn vào chiều sâu của sự thư giãn, kết hợp nuôi dưỡng thể chất và khơi nguồn năng lượng Tantra nguyên bản trong không gian biệt lập. Gồm: Tẩy da chết & Massage mặt + Massage toàn thân kết hợp nghi thức Linga/Yoni Ritual.',
      en: 'A premium wellness journey designed to deeply relax your body and mind, combining physical nourishment with authentic Tantra energy in a completely private space. Includes: Full body exfoliation, facial massage & mask + Bodywork with Linga/Yoni Ritual.'
    },
    durations: [75, 90],
    prices: [1300000, 1500000],
    image: '/images/private-combo-client.jpg',
    gallery: ['/images/private-combo-client.jpg']
  }
];

export const copy = {
  vi: {
    nav: ['Tinh thần', 'Dịch vụ', 'Trải nghiệm', 'Đặt lịch'],
    book: 'Đặt lịch hẹn',
    eyebrow: 'MASSAGE · BODYWORK · SELF-CARE',
    hero: 'Chạm sâu.\nThả lỏng.\nTrở về mình.',
    intro: 'Dành riêng cho bạn một khoảng thư thái. Chia sẻ nhu cầu qua biểu mẫu, nhắn tin chọn nhà trị liệu yêu thích và đặt hẹn theo cách của bạn.',
    explore: 'Khám phá dịch vụ',
    note: 'Bản xem trước · Nội dung & hình ảnh minh họa',
    philosophy: 'SỰ CHĂM SÓC BẮT ĐẦU TỪ LẮNG NGHE',
    phTitle: 'Cơ thể bạn có\ncâu chuyện riêng.',
    phText: 'Tại Touch Art, chúng tôi hướng đến một cách chăm sóc có sự lắng nghe: bắt đầu bằng cuộc trò chuyện, tôn trọng sự thoải mái và dành thời gian cho từng trải nghiệm.',
    menu: 'FIND YOUR MOMENT · MENU CHĂM SÓC',
    menuTitle: 'Hôm nay, bạn cần một khoảng nghỉ.',
    menuText: 'Chọn gói để bắt đầu cuộc trò chuyện. Nhà trị liệu sẽ được tư vấn và chốt riêng ở bước cuối.',
    all: 'Tất cả',
    relax: 'Thư giãn',
    tantra: 'Linga & Yoni',
    body: '4 Tay',
    combo: 'Private Combo',
    minutes: 'phút',
    price: 'Giá tham khảo · xác nhận khi tư vấn',
    choose: 'Chọn gói này',
    space: 'KHÔNG GIAN & CON NGƯỜI',
    spaceTitle: 'Một cảm giác được đón nhận.',
    spaceText: 'Ánh sáng dịu. Nhịp điệu chậm. Những chi tiết nhỏ tạo nên một trải nghiệm riêng tư và gần gũi.',
    teamTitle: 'Con người tạo nên sự chăm sóc.',
    teamText: 'Hồ sơ, chuyên môn và hình ảnh người thực hiện sẽ được công bố sau khi được xác nhận và cho phép. Trong cuộc trò chuyện, tư vấn viên sẽ giới thiệu người phù hợp đang sẵn sàng.',
    booking: 'KHOẢNG NGHỈ CỦA BẠN',
    bookingTitle: 'Bắt đầu bằng\nmột lời nhắn.',
    bookingText: 'Chọn gói, chia sẻ ưu tiên người thực hiện và lời nhắn nếu muốn. Xem lại nội dung trước khi chọn kênh trò chuyện.',
    faqTitle: 'Một vài điều bạn muốn biết.',
    footer: 'Nghệ thuật chăm sóc cơ thể, bắt đầu từ sự lắng nghe.',
    privacy: 'Quyền riêng tư & Chính sách',
    location: 'ĐỊA ĐIỂM',
    locationTitle: 'Một thương hiệu. Nhiều điểm chạm.',
    locationText: 'Touch Art · An Thượng — 22 An Thượng 6, Đà Nẵng. Không gian riêng tư, ấm cúng và đầy nghệ thuật.'
  },
  en: {
    nav: ['Our approach', 'Treatments', 'Experience', 'Booking'],
    book: 'Book appointment',
    eyebrow: 'MASSAGE · BODYWORK · SELF-CARE',
    hero: 'A deeper touch.\nLet go.\nReturn to yourself.',
    intro: 'A peaceful pause just for you. Share your preferences through the form, connect privately to choose your therapist, and book on your own terms.',
    explore: 'Explore treatments',
    note: 'Preview · Illustrative content & photography',
    philosophy: 'CARE BEGINS WITH LISTENING',
    phTitle: 'Your body has\na story of its own.',
    phText: 'Touch Art embraces attentive care: starting with a conversation, respecting your comfort, and making space for every experience.',
    menu: 'FIND YOUR MOMENT · TREATMENT MENU',
    menuTitle: 'Today, you need a mindful pause.',
    menuText: 'Choose a treatment to start a conversation. Your therapist will be privately discussed and confirmed at the final step.',
    all: 'All treatments',
    relax: 'Relaxation',
    tantra: 'Linga & Yoni',
    body: '4 Hands',
    combo: 'Private Combo',
    minutes: 'min',
    price: 'Reference pricing · confirmed in consultation',
    choose: 'Choose this package',
    space: 'SPACE & PEOPLE',
    spaceTitle: 'A sense of being welcomed.',
    spaceText: 'Soft light. A slower rhythm. Small details that make your experience personal, private and comfortable.',
    teamTitle: 'The people behind the care.',
    teamText: 'Practitioner profiles, qualifications and photographs will be published once verified and approved. Your consultant will introduce suitable available practitioners in your conversation.',
    booking: 'YOUR MOMENT OF PAUSE',
    bookingTitle: 'It starts with\na conversation.',
    bookingText: 'Choose a treatment, add a practitioner preference and an optional note. Review your message before choosing a chat channel.',
    faqTitle: 'A few things you might wonder.',
    footer: 'The art of caring for the body, beginning with listening.',
    privacy: 'Privacy & Policies',
    location: 'OUR LOCATIONS',
    locationTitle: 'One brand. Many points of connection.',
    locationText: 'Touch Art · An Thượng — 22 An Thuong 6, Da Nang. A serene, intimate sanctuary for conscious body care.'
  }
};

