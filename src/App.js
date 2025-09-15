import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    fetchPosts();
  }, []);

  async function fetchPosts() {
    let { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
  }

  async function handleLogin() {
    const phone = prompt("أدخل رقم الهاتف:");
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) alert(error.message);
    else alert("تم إرسال كود الدخول برسالة قصيرة");
  }

  async function addPost() {
    if (!content) return;
    await supabase.from("posts").insert([{ user_id: user.id, content }]);
    setContent("");
    fetchPosts();
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🪨 منصة مايننج شوب</h1>
      {!user ? (
        <button onClick={handleLogin}>تسجيل الدخول برقم الهاتف</button>
      ) : (
        <>
          <h2>مرحبا، {user.phone}</h2>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="اكتب منشورك هنا" />
          <br />
          <button onClick={addPost}>نشر</button>
          <h3>آخر المنشورات</h3>
          <ul>
            {posts.map((p) => (
              <li key={p.id}>{p.content} — {p.created_at}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
