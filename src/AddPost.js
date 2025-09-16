import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function AddPost(){
  const [title,setTitle]=useState('');
  const [content,setContent]=useState('');
  const [user,setUser]=useState(null);

  useEffect(()=>{
    (async ()=>{
      const { data: { user } } = await supabase.auth.getUser();
      if(user){
        const { data } = await supabase.from('users').select('*').eq('phone', user.phone).single();
        setUser(data);
      }
    })();
  },[]);

  const submit = async ()=>{
    if(!user){ alert('سجل دخول أولاً'); return; }
    const { error } = await supabase.from('posts').insert([{ user_id: user.id, title, content }]);
    if(error) alert('خطأ: '+error.message);
    else { alert('تم نشر المنشور'); setTitle(''); setContent(''); }
  };

  return (
    <div className="container">
      <h1>نشر خامة أو طلب</h1>
      <input placeholder="عنوان" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea placeholder="تفاصيل" value={content} onChange={e=>setContent(e.target.value)} />
      <button onClick={submit}>نشر</button>
    </div>
  );
}
