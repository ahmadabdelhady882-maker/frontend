import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function CarriersList(){
  const [list,setList]=useState([]);
  useEffect(()=>{
    (async ()=>{
      const { data, error } = await supabase.from('users').select('id,name,phone,vehicle_number,vehicle_type').eq('role','ناقل');
      if(!error) setList(data||[]);
    })();
  },[]);

  return (
    <div className="container">
      <h1>قائمة الناقلين</h1>
      {list.length===0 && <p>لا يوجد ناقلين مسجلين.</p>}
      {list.map(c=>(
        <div key={c.id} className="card">
          <h3>{c.name}</h3>
          <p>📞 {c.phone}</p>
          <p>🚜 رقم الجرار: {c.vehicle_number || '-'}</p>
          <p>🛻 نوع الجرار: {c.vehicle_type || '-'}</p>
          <a href={`tel:${c.phone}`} className="btn">اتصل</a>
        </div>
      ))}
    </div>
  );
}
