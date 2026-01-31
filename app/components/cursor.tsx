"use client";

import React, { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("#C4FDAC");

  useEffect(() => {
    const moveHandler = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const el = document.elementFromPoint(e.clientX, e.clientY);

      if (!el) {
        setColor("#C4FDAC");
        return;
      }

      const isBgDiv =
        el.classList.contains("bg-black") ||
        el.closest(".bg-black") === el;

      if (isBgDiv && el === document.querySelector(".bg-black")) {
        // 鼠标在背景 div 自身
        setColor("#C4FDAC");
      } else {
        // 鼠标在子元素 → 做反色
        const computed = window.getComputedStyle(el);
        let c = computed.color;

        if (computed.fill && computed.fill !== "none") {
          c = computed.fill;
        }

        if (c?.startsWith("rgb")) {
          const [r, g, b] = c.match(/\d+/g)?.map(Number) || [255, 255, 255];
          setColor(
            `#${(255 - r).toString(16).padStart(2, "0")}${(255 - g)
              .toString(16)
              .padStart(2, "0")}${(255 - b).toString(16).padStart(2, "0")}`
          );
        } else {
          setColor("#ffffff");
        }
      }
    };

    document.addEventListener("pointermove", moveHandler);

    return () => {
      document.removeEventListener("pointermove", moveHandler);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x - 15,
        top: pos.y - 15,
        width: 30,
        height: 30,
        borderRadius: "50%",
        backgroundColor: color,
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
      }}
    />
  );
}