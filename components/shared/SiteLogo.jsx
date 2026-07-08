"use client";

import { useState } from "react";

export default function SiteLogo({ footer = false, src = "/assets/shared/riologov2.png" }) {
  const [broken, setBroken] = useState(false);

  if (footer) {
    return (
      <a className="logo" href="/" aria-label="Rio Children's Hospital">
        {!broken ? (
          <img
            className="logo-img footer-logo-img"
            src={src}
            alt="Rio Children's Hospital"
            onError={() => setBroken(true)}
          />
        ) : (
          <span className="logo-word on-dark">
            Rio<em>HOSPITAL</em>
          </span>
        )}
      </a>
    );
  }

  return (
    <a className="logo" href="/" aria-label="Rio Children's Hospital - Home">
      {!broken ? (
        <img
          className="logo-img"
          src={src}
          alt="Rio Children's Hospital"
          onError={() => setBroken(true)}
        />
      ) : (
        <span className="logo-word">
          Rio<em>HOSPITAL</em>
        </span>
      )}
    </a>
  );
}
