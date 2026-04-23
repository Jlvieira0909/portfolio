"use client";

import { useEffect } from "react";

const favicons = [
  "/favicons/favicon.png",
  "/favicons/favicon01.png",
  "/favicons/favicon02.png",
  "/favicons/favicon03.png",
  "/favicons/favicon04.png",
  "/favicons/favicon05.png",
  "/favicons/favicon06.png",
  "/favicons/favicon07.png",
  "/favicons/favicon08.png",
  "/favicons/favicon09.png",
  "/favicons/favicon10.png",
];

export default function RandomFavicon() {
  useEffect(() => {
    const randomIcon = favicons[Math.floor(Math.random() * favicons.length)];
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = randomIcon;
  }, []);

  return null;
}
