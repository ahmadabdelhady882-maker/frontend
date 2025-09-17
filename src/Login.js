import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Login(){
  const [phone,setPhone]=useState('');
  const [otp,setOtp]=useState('');
  const [step,setStep]=useState('enter'); // enter, verify, done
  const [name,setName]=useState('');
  const [role,setRole]=useState('مورد');
  const [vehicleNumber,setVehicleNumber]=useState('');
  const [vehicleType,setVehicleType]=useState('');

  const sendOtp = async ()=>{
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if(error) alert('خطأ في إرسال الكود: '+error.message);
    else { alert('تم إرسال الكود'); setStep('verify'); }
  };

  const verifyOtp = async ()=>{
    const { data, error } = await supabase.auth.verifyOtp({ phone, token: otp, type: 'sms' });
    if(error) { alert('كود خاطئ'); }
    else { alert('تم التحقق'); setStep('done'); }
  };

  const saveProfile = async ()=>{
    const { data: { user } } = await supabase.auth.getUser();
    if(!user){ alert('يجب تسجيل الدخول أولاً'); return; }
    // upsert based on phone
    const payload = { phone, name, role };
    if(role==='ناقل'){ payload.vehicle_number = vehicleNumber; payload.vehicle_type = vehicleType; }
    const { error } = await supabase.from('users').upsert(payload, { onConflict: 'phone' });
    if(error) alert('خطأ في حفظ الملف الشخصي: '+error.message);
    else alert('تم حفظ الملف الشخصي');
  };

  return (
    <div className="container">
      <h1>تسجيل / تسجيل دخول</h1>
      {step==='enter' && (
        <div className="form">
          <input placeholder="رقم الهاتف (مثال: +2010...)" value={phone} onChange={e=>setPhone(e.target.value)} />
          <button onClick={sendOtp}>أرسل كود</button>
        </div>
      )}

      {step==='verify' && (
        <div className="form">
          <input placeholder="أدخل الكود" value={otp} onChange={e=>setOtp(e.target.value)} />
          <button onClick={verifyOtp}>تأكيد الكود</button>
        </div>
      )}

      {step==='done' && (
        <div className="form">
          <input placeholder="الاسم" value={name} onChange={e=>setName(e.target.value)} />
          <select value={role} onChange={e=>setRole(e.target.value)}>
            <option value="مورد">مورد</option>
            <option value="صاحب محجر">صاحب محجر</option>
            <option value="ناقل">ناقل</option>
          </select>
          {role==='ناقل' && (
            <>
              <input placeholder="رقم الجرار" value={vehicleNumber} onChange={e=>setVehicleNumber(e.target.value)} />
              <input placeholder="نوع الجرار" value={vehicleType} onChange={e=>setVehicleType(e.target.value)} />
            </>
          )}
          <button onClick={saveProfile}>احفظ الملف الشخصي</button>
        </div>
      )}
    </div>
  );
}
