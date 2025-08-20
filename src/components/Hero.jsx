import React from "react";

export default function Hero({ title, subtitle, right, className = "" }) {
  return (
    <div className={`hero card-surface animate-in ${className}`} style={{ padding: 18, marginBottom: 16 }}>
      <div>
        {title && <h1 style={{ margin: 0 }}>{title}</h1>}
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
      {right ? <div>{right}</div> : null}
    </div>
  );
}



