import React, { useState, useEffect } from "react";

// Slider content and backgrounds
const slides = [
  {
    title: "We Care Your Child’s Growth",
    heading: "The Best Place For Your Kid’s Bright Future",
    bg: "/assets/banner/hero-bg1.jpg", // <-- yahan sahi path
    btn1: { text: "Get Started", link: "/admission" },
    btn2: { text: "Learn More", link: "/about" },
  },
  {
    title: "To achieve success, one must have positive thinking",
    heading: "Gyan Dayini Classes: Personal Focus, Secure Results",
    bg: "/assets/banner/hero-bg2.jpg", // <-- yahan sahi path
    btn1: { text: "Enroll Now", link: "/admission" },
    btn2: { text: "Contact Us", link: "/contact" },
  }
];

// Main Hero Section
export default function Hero() {
  const [index, setIndex] = useState(0);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section
      className="hero-slider-section"
      style={{
        position: "relative",
        minHeight: "440px",
        display: "flex",
        alignItems: "center",
        background: `linear-gradient(rgb(255 90 145 /.70),rgb(255 255 255 / .85)), url(${slide.bg}) center /cover no-repeat`,
        transition: "background .8s"
      }}
    >
      <div className="container" style={{ maxWidth: 1160, margin: "auto", padding: "70px 38px" }}>
        <h5 style={{ color: "#f06a8b", fontSize: 23, marginBottom: 10 }}>{slide.title}</h5>
        <h1 style={{
          color: "#fff",
          fontSize: 42,
          lineHeight: "1.25",
          fontWeight: 700,
          textShadow: "1px 3px 18px #e046837d"
        }}>
          {slide.heading}<br />
        </h1>
        <div style={{ marginTop: 25, display: "flex", gap: 20 }}>
          <a href={slide.btn1.link} style={heroBtnStyle1}>{slide.btn1.text}</a>
          <a href={slide.btn2.link} style={heroBtnStyle2}>{slide.btn2.text}</a>
        </div>
      </div>
    </section>
  );
}

const heroBtnStyle1 = {
  background: "#ff5a91",
  color: "#fff", fontWeight: 700, borderRadius: 9,
  padding: "12px 28px", boxShadow: "0 2px 14px #f06a8b44",
  textDecoration: "none", fontSize: 18, letterSpacing: ".5px"
};
const heroBtnStyle2 = {
  background: "#fff",
  color: "#ff5a91", fontWeight: 700, borderRadius: 8,
  padding: "12px 24px", boxShadow: "0 2px 14px #f06a8b22",
  marginLeft: 10, textDecoration: "none", fontSize: 18
};
