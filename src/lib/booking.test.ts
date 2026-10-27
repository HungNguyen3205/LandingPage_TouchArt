import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validate,message,whatsappUrl} from './booking.ts';
const valid={serviceId:'restore',duration:'60',date:'2099-01-01',time:'10:00',location:'consult',preference:'none',note:'A & B'};
test('rejects duration outside selected treatment',()=>assert.ok(validate({...valid,duration:'120'}).duration));
test('rejects past date and invalid preference',()=>{assert.ok(validate({...valid,date:'2000-01-01'}).date);assert.ok(validate({...valid,preference:'other'}).preference)});
test('valid request and plain message preserve input',()=>{assert.deepEqual(validate(valid),{});assert.ok(message(valid,'en').includes('A & B'));assert.ok(message(valid,'vi').includes('chưa phải'))});
test('contact URL validates phone and encodes message',()=>{assert.equal(whatsappUrl('bad','x'),null);assert.ok(whatsappUrl('+84912345678','A & B')?.endsWith('A%20%26%20B'))});
