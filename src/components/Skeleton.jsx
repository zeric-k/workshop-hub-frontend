import React from "react";
import "./Skeleton.css";

export function SkeletonLine({ width = "100%", height = 12, className = "" }) {
  return <div className={`skeleton-line ${className}`} style={{ width, height }} />;
}

export function SkeletonCard() {
  return (
    <div className="card skeleton-card">
      <SkeletonLine width="60%" height={20} />
      <SkeletonLine width="40%" height={12} />
      <SkeletonLine width="50%" height={12} />
      <SkeletonLine width="30%" height={12} />
      <div className="skeleton-actions">
        <SkeletonLine width={90} height={36} />
        <SkeletonLine width={120} height={36} />
      </div>
    </div>
  );
}

export default function SkeletonGrid({ count = 6 }) {
  return (
    <div className="card-grid">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}


