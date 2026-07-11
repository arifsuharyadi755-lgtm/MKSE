import React from "react";

interface MKSLogoProps {
  className?: string;
  color?: string; // Tailwind class color or inline fill
  showBackground?: boolean;
}

export default function MKSLogo({ className = "w-10 h-10", color = "currentColor", showBackground = false }: MKSLogoProps) {
  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {showBackground && (
        <rect width="320" height="240" rx="20" fill="black" />
      )}
      
      {/* Outer Swoosh Orbit Ring */}
      <path
        d="M 175,35 C 110,12 35,42 35,110 C 35,185 110,215 205,215 C 255,215 275,190 275,170 C 275,155 260,145 245,145 C 245,145 260,160 250,170 C 235,188 200,200 170,200 C 95,200 50,165 50,110 C 50,55 110,30 175,55 Z"
        fill={color}
        className="transition-all duration-300"
      />

      {/* Inner Accent Swoosh Orbit Ring */}
      <path
        d="M 155,55 C 110,38 55,60 55,110 C 55,160 110,185 175,185 C 215,185 240,165 240,150 C 240,138 230,130 220,130 C 220,130 230,142 225,150 C 210,165 180,172 155,172 C 95,172 70,145 70,110 C 70,75 110,55 155,73 Z"
        fill={color}
        className="opacity-90"
      />

      {/* Bold Stylized "MKS" Text */}
      <text
        x="155"
        y="128"
        fill={color}
        fontFamily="system-ui, -apple-system, 'SF Pro Display', 'Inter', 'Impact', sans-serif"
        fontWeight="900"
        fontSize="82"
        letterSpacing="-3"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ transform: "skewX(-8deg)", transformOrigin: "155px 128px" }}
      >
        MKS
      </text>
    </svg>
  );
}
