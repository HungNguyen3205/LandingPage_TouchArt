import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validate,message,whatsappUrl,estimate} from './booking.ts';
const valid={serviceId:'restore',duration:'60',date:'2099-01-01',time:'10:00',location:'consult',preference:'none',note:'A & B'};
test('rejects duration outside selected treatment',()=>assert.ok(validate({...valid,duration:'120'}).duration));
test('rejects past date and invalid preference',()=>{assert.ok(validate({...valid,date:'2000-01-01'}).date);assert.ok(validate({...valid,preference:'other'}).preference)});
test('valid request and plain message preserve input',()=>{assert.deepEqual(validate(valid),{});assert.ok(message(valid,'en').includes('A & B'));assert.ok(message(valid,'vi').includes('chưa phải'))});
test('contact URL validates phone and encodes message',()=>{assert.equal(whatsappUrl('bad','x'),null);assert.ok(whatsappUrl('+84912345678','A & B')?.endsWith('A%20%26%20B'))});

test('night charge uses one provisional window and never stacks',()=>{assert.equal(estimate('restore',60,'22:00').total,600000);assert.equal(estimate('restore',60,'00:00').total,700000);assert.equal(estimate('restore',60,'08:59').total,700000);assert.equal(estimate('restore',60,'09:00').total,500000)});
test('hotel needs location detail and consultation has no quoted base price',()=>{assert.ok(validate({...valid,location:'hotel'}).hotel);assert.equal(estimate('consult',60,'10:00').total,null)});

test('compact form allows unspecified date but rejects partial and past scheduling',()=>{assert.deepEqual(validate({...valid,date:'',time:''},new Date(),true),{});assert.ok(validate({...valid,date:'2099-01-01',time:''},new Date(),true).date);assert.ok(validate({...valid,date:'2000-01-01'},new Date(),true).date)});
test('compact message preserves contact and explains unspecified time',()=>{const text=message({...valid,date:'',time:'',contact:'+84 912 345 678'},'vi');assert.ok(text.includes('+84 912 345 678'));assert.ok(text.includes('Ngày giờ mong muốn: Nhờ tư vấn'))});
