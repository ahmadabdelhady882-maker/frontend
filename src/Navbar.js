import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
  return (
    <nav className="nav">
      <div className="container">
        <div className="brand">Mining Shop</div>
        <div className="links">
          <Link to="/">الرئيسية</Link>
          <Link to="/add-post">نشر</Link>
          <Link to="/carriers">الناقلين</Link>
          <Link to="/login">تسجيل / حسابي</Link>
        </div>
      </div>
    </nav>
  );
}
