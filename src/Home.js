import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Home(){
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    fetchPosts();
  },[]);

  async function fetchPosts(){
    const { data, error } = await supabase
      .from('posts')
      .select('id,title,content,created_at,users(name,role)')
      .order('created_at', { ascending: false });
    if(!error) setPosts(data || []);
  }

  return (
    <div className="container">
      <h1>آخر المنشورات</h1>
      {posts.length===0 && <p>لا توجد منشورات بعد.</p>}
      {posts.map(p=>(
        <div key={p.id} className="card">
          <h3>{p.title}</h3>
          <p>{p.content}</p>
          <small>بواسطة {p.users?.name || 'مستخدم'} ({p.users?.role || '-'}) - {new Date(p.created_at).toLocaleString('ar-EG')}</small>
        </div>
      ))}
    </div>
  );
}
