// InstagramEmbed.jsx
import React, { useEffect } from "react";

export default function InstagramEmbed({ postUrl }) {
  useEffect(() => {
    const process = () => {
      try {
        // @ts-ignore
        if (window.instgrm && window.instgrm.Embeds && window.instgrm.Embeds.process) {
          // @ts-ignore
          window.instgrm.Embeds.process();
        }
      } catch (_) {}
    };

    if (!window.instgrm || !window.instgrm.Embeds) {
      const existing = document.querySelector('script[src="//www.instagram.com/embed.js"]');
      if (!existing) {
        const script = document.createElement("script");
        script.async = true;
        script.src = "//www.instagram.com/embed.js";
        script.onload = process;
        document.body.appendChild(script);
      } else {
        existing.addEventListener("load", process, { once: true });
      }
    } else {
      process();
    }
  }, [postUrl]);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={postUrl}
      data-instgrm-version="14"
      style={{ maxWidth: "540px", margin: "auto" }}
    ></blockquote>
  );
}