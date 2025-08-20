import React from "react";

export default function EmptyState({ title = "Nothing here", description = "", action = null }) {
  return (
    <div className="empty-state card-surface animate-in" style={{ padding: 20, textAlign: "center" }}>
      <h3 style={{ margin: 0, marginBottom: 6 }}>{title}</h3>
      {description ? <p className="subtitle" style={{ margin: 0 }}>{description}</p> : null}
      {action ? <div style={{ marginTop: 12 }}>{action}</div> : null}
    </div>
  );
}



