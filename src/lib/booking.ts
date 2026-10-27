import { services } from '../data/content.ts';
import type { Locale } from '../data/content.ts';
export type Request = {serviceId:string;duration:string;date:string;time:string;location:string;preference:string;note:string;hotel?:string;contact?:string};
export function validate(r:Request, now=new Date(),allowUnscheduled=false):Record<string,string> {
 const errors:Record<string,string>={}; const service=services.find(s=>s.id===r.serviceId);
 if(!service && r.serviceId!=='consult') errors.serviceId='service';
 if(!(service?.durations??[60,90]).includes(Number(r.duration))) errors.duration='duration';
 const date=new Date(r.date+'T'+r.time+':00+07:00');
 if((!allowUnscheduled || r.date || r.time) && (!/^\d{4}-\d{2}-\d{2}$/.test(r.date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(r.time) || !Number.isFinite(date.getTime()) || date<=now)) errors.date='date';
 if(!['consult','an-thuong','hotel'].includes(r.location)) errors.location='location';
 if(!['none','female','male'].includes(r.preference)) errors.preference='preference';
 if(r.location==='hotel' && (!r.hotel?.trim() || r.hotel.length>200)) errors.hotel='hotel';
 if(r.note.length>1000) errors.note='note';
 return errors;
}
export function message(r:Request,locale:Locale) {
 const service=services.find(s=>s.id===r.serviceId); const vi=locale==='vi';
 const preference=vi?{none:'Không yêu cầu',female:'Nữ',male:'Nam'}:{none:'No preference',female:'Female',male:'Male'};
 return [vi?'YÊU CẦU TƯ VẤN TOUCH ART':'TOUCH ART CONSULTATION REQUEST',
 (vi?'Dịch vụ: ':'Treatment: ')+(service?.name[locale]??(vi?'Nhờ tư vấn':'Please advise')),
 (vi?'Thời lượng: ':'Duration: ')+r.duration+(vi?' phút':' min'),
 (vi?'Ngày giờ mong muốn: ':'Requested date & time: ')+(r.date&&r.time?r.date+' '+r.time+' (UTC+7)':(vi?'Nhờ tư vấn':'Please advise')),
 ...(r.contact?.trim()?[(vi?'Liên hệ: ':'Contact: ')+r.contact.trim()]:[]),
 (vi?'Địa điểm: ':'Location: ')+(r.location==='an-thuong'?'22 An Thượng 6, Đà Nẵng':r.location==='hotel'?(vi?'Tại khách sạn — cần xác nhận: ':'Hotel visit — confirmation required: ')+(r.hotel?.trim()??''):(vi?'Cần tư vấn':'Please advise')),
 (vi?'Ưu tiên người thực hiện: ':'Practitioner preference: ')+preference[r.preference as keyof typeof preference],
 (vi?'Giá tham khảo: ':'Reference price: ')+(service?.prices[service.durations.indexOf(Number(r.duration))]?.toLocaleString('vi-VN')??'—')+' VND — '+(vi?'chưa gồm phụ phí, chờ xác nhận':'excluding additional charges, confirmation required'),
 (vi?'Phụ phí đêm dự kiến: ':'Provisional night charge: ')+estimate(r.serviceId,Number(r.duration),r.time).surcharge.toLocaleString('vi-VN')+' VND',
 (vi?'Tạm tính, chờ xác nhận: ':'Provisional total, subject to confirmation: ')+(estimate(r.serviceId,Number(r.duration),r.time).total?.toLocaleString('vi-VN')??(vi?'Nhờ tư vấn':'Please advise'))+' VND — '+(vi?'phục vụ khách sạn báo giá riêng':'hotel visits quoted separately'),
 ...(r.note.trim()?[(vi?'Lời nhắn: ':'Note: ')+r.note.trim()]:[]),
 vi?'Đây là yêu cầu, chưa phải lịch hẹn đã xác nhận.':'This is a request, not a confirmed appointment.'].join('\n');
}
export function whatsappUrl(phone:string,text:string){if(!/^\+?[1-9]\d{7,14}$/.test(phone))return null;return 'https://wa.me/'+phone.replace('+','')+'?text='+encodeURIComponent(text);}

export function estimate(serviceId:string,duration:number,time:string){const service=services.find(s=>s.id===serviceId);const base=service?.prices[service.durations.indexOf(duration)]??null;const hour=Number(time.split(':')[0]);const surcharge=time&&Number.isFinite(hour)?(hour<9?200000:hour>=22?100000:0):0;return {base,surcharge,total:base===null?null:base+surcharge};}
