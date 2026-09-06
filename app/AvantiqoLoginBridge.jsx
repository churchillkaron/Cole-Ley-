"use client";

import { useEffect } from "react";

const AVANTIQO_LOGIN_URL = "https://avantiqo.ai/login";

export default function AvantiqoLoginBridge() {
  useEffect(() => {
    const handleClick = (event) => {
      if (window.location.pathname !== "/") return;

      const button = event.target?.closest?.("button");
      if (!button) return;

      const label = button.textContent?.trim().toUpperCase();
      if (label !== "LOGIN") return;

      event.preventDefault();
      event.stopPropagation();
      window.location.assign(AVANTIQO_LOGIN_URL);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
