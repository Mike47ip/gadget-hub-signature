"use client";

import { useEffect, useState } from "react";

/**
 * Toast notification component
 * @param {{ message: string, visible: boolean, onClose: () => void }} props
 */
export default function Toast({ message, visible, onClose }) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [visible, onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 bg-navy-900 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-xl transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      {message}
    </div>
  );
}
