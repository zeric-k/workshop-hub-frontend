// InstagramEmbed.jsx
import React, { useEffect } from "react";

export default function InstagramEmbed({ postUrl }) {
  useEffect(() => {
    // Load Instagram embed script when component mounts
    const script = document.createElement("script");
    script.async = true;
    script.src = "//www.instagram.com/embed.js";
    document.body.appendChild(script);
  }, []);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={postUrl}
      data-instgrm-version="14"
      style={{ maxWidth: "540px", margin: "auto" }}
    ></blockquote>
  );
}