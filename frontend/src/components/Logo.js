import React from "react";

const Logo = ({ w = 120, h = 100 }) => (
  <svg width={w} height={h} viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shopping bag icon */}
    <rect x="10" y="10" width="40" height="40" rx="8" fill="#e53935"/>
    <path d="M20 30 Q30 10 40 30" stroke="#fff" strokeWidth="3" fill="none"/>
    <circle cx="30" cy="25" r="4" fill="#fff"/>
    {/* Brand text */}
    <text x="60" y="32" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="bold" fontSize="28" fill="#222">Sai</text>
    <text x="62" y="50" fontFamily="Segoe UI, Arial, sans-serif" fontSize="14" fill="#888">Shop Here</text>
  </svg>
);

export default Logo;