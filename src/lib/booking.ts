import { services } from '../data/content.ts';
import type { Locale } from '../data/content.ts';
export type Request = {serviceId:string;duration:string;date:string;time:string;location:string;preference:string;note:string};
export function validate(r:Request, now=new Date()):Record<string,string> {
 const errors:Record<string,string>={}; const service=services.find(s=>s.id===r.serviceId);
 if(!service) errors.serviceId='service';
 if(!service?.durations.includes(Number(r.duration))) errors.duration='duration';
 const date=new Date(r.date+'T'+r.time+':00+07:00');
 if(!r.date || !r.time || !Number.isFinite(date.getTime()) || date<=now) errors.date='date';
 if(!['consult','an-thuong','hotel'].includes(r.location)) errors.location='location';
 if(!['none','female','male'].includes(r.preference)) errors.preference='preference';
 if(r.note.length>1000) errors.note='note';
 return errors;
}
export function message(r:Request,locale:Locale) {
 const service=services.find(s=>s.id===r.serviceId); const vi=locale==='vi';
 const preference=vi?{none:'Không yêu cầu',female:'Nữ',male:'Nam'}:{none:'No preference',female:'Female',male:'Male'};
 return [vi?'YÊU CẦU TƯ VẤN TOUCH ART':'TOUCH ART CONSULTATION REQUEST',
 (vi?'Dịch vụ: ':'Treatment: ')+(service?.name[locale]??'—'),
 (vi?'Thời lượng: ':'Duration: ')+r.duration+(vi?' phút':' min'),
 (vi?'Ngày giờ mong muốn: ':'Requested date & time: ')+r.date+' '+r.time+' (UTC+7)',
 (vi?'Địa điểm: ':'Location: ')+(r.location==='an-thuong'?'22 An Thượng 6, Đà Nẵng':r.location==='hotel'?(vi?'Tại khách sạn — cần xác nhận':'Hotel visit — confirmation required'):(vi?'Cần tư vấn':'Please advise')),
 (vi?'Ưu tiên người thực hiện: ':'Practitioner preference: ')+preference[r.preference as keyof typeof preference],
 (vi?'Giá tham khảo: ':'Reference price: ')+(service?.prices[service.durations.indexOf(Number(r.duration))]?.toLocaleString('vi-VN')??'—')+' VND — '+(vi?'chưa gồm phụ phí, chờ xác nhận':'excluding additional charges, confirmation required'),
 ...(r.note.trim()?[(vi?'Lời nhắn: ':'Note: ')+r.note.trim()]:[]),
 vi?'Đây là yêu cầu, chưa phải lịch hẹn đã xác nhận.':'This is a request, not a confirmed appointment.'].join('\n');
}
export function whatsappUrl(phone:string,text:string){if(!/^\+?[1-9]\d{7,14}$/.test(phone))return null;return 'https://wa.me/'+phone.replace('+','')+'?text='+encodeURIComponent(text);}
