import React from "react";
import "./Footer.css";

const timings = [
  "Monday: 8am to 5pm",
  "Tuesday: 8am to 5pm",
  "Wednesday: 8am to 5pm",
  "Thursday: 8am to 5pm",
  "Friday: 8am to 5pm",
  "Saturday: 8am to 5pm",
  "Sunday: Closed"
];
const gallery = [
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
  "/images/gallery5.jpg",
  "/images/gallery6.jpg"
];

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Column 1: Logo + About + Newsletter */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <img
              src="/images/logo.png"
              alt="Gyan Dayini Logo"
              style={{
                height: 54,
                width: 54,
                borderRadius: "50%",
                marginRight: 12,
                border: "3px solid #e14584",
                background: "#fff"
              }}
            />
            <span className="logo-brand" style={{
              fontWeight: 900,
              fontFamily: "Poppins,sans-serif",
              fontSize: 29,
              color: "#c82d63"
            }}>
              Gyan Dayini<br />
              <span style={{
                color: "#4763fa",
                fontWeight: 700,
                fontSize: 19,
                letterSpacing: "0.5px"
              }}>
                Classes
              </span>
            </span>
          </div>
          <div className="footer-text">
            To achieve success, one must have positive thinking.<br />
            <b>Pre-Primary:</b> Jr. KG & Sr. KG<br />
            <b>Primary to Secondary:</b> Class 1<sup>st</sup> to 10<sup>th</sup> (SSC & CBSE Boards)
          </div>
          <form className="footer-newsletter">
            <label>Newsletter</label>
            <div className="newsletter-box">
              <input type="email" placeholder="Your email" />
              <button type="submit">SignUp</button>
            </div>
          </form>
        </div>

        {/* Column 2: Timing */}
        <div className="footer-col timing-col">
      <div className="timing-box">
  {timings.map((t, idx) => {
    // "Monday: 8am to 5pm" को split करें
    const [day, ...rest] = t.split(":");
    const time = rest.join(":").trim();
    return (
      <div className="timing-row" key={idx}>
        <span className="timing-day">{day}</span>
        <span className="timing-colon">:</span>
        <span className="timing-hours">{time}</span>
      </div>
    );
  })}
</div>
        </div>

        {/* Column 3: Location / Contact */}
        <div className="footer-col contact-col">
          <div className="footer-title">LOCATION</div>
          <div className="line-under" />
          <div className="footer-info">
            <span><i className="fas fa-map-marker-alt"></i> 104 North Tower, Mumbai, India</span>
            <span><i className="fas fa-phone"></i> +91 9198582342, +91 8174997923</span>
            <span><i className="fas fa-envelope"></i> gyandayiniclasses@gmail.com</span>
            <span><i className="fas fa-clock"></i> 24/7 Hours Service</span>
          </div>
          <div className="footer-socials">
            <a href="#"><i className="fab fa-facebook-f" /></a>
            <a href="#"><i className="fab fa-twitter" /></a>
            <a href="#"><i className="fab fa-instagram" /></a>
            <a href="#"><i className="fab fa-linkedin-in" /></a>
          </div>
        </div>

        {/* Column 4: Gallery */}
        <div className="footer-col gallery-col">
          <div className="footer-title">OUR GALLERY</div>
          <div className="line-under" />
          <div className="footer-gallery">
            {gallery.slice(0, 6).map((img, i) => (
              <div key={i} className="footer-gallery-img">
                <img src={img} alt={`gallery${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
