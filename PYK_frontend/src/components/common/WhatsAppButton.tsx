"use client";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Show button after leaving hero (مثلاً hero ارتفاعه 600px)
      if (window.scrollY > 50) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      // حالة scrolling
      setScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setScrolling(false);
      }, 200); // لو وقفت عن الـ scroll بعد 200ms
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="https://wa.me/201007379415"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-5 right-5 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 ${
        scrolling ? "opacity-40" : "opacity-100"
      }`}
    >
      <MessageCircle size={28} />
    </a>
  );
}
