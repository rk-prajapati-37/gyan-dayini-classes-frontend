import React from "react";

export default function AboutSection() {
  return (
    <section className="about-section" style={{
      background: "#fffafb", padding: "60px 0"
    }}>
      <div className="container" style={{
        maxWidth: 1180, margin: "auto", display: "flex", gap: 36, flexWrap: "wrap"
      }}>
        {/* Left: image and play button */}
        <div style={{
          flex: "0 0 340px", maxWidth: 360, minWidth: 250,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ position: "relative" }}>
            <img
              src="/assets/about-img.jpg"
              alt="Kids learning"
              style={{
                width: 300, height: 220, borderRadius: "50% 60% 42% 58%/50% 62% 38% 50%",
                objectFit: "cover", boxShadow: "0 4px 29px #d9a8a829"
              }}
            />
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"
              style={playBtnStyle}
            >
              <i className="fa fa-play"></i>
            </a>
          </div>
        </div>
        {/* Right: About Card */}
        <div style={{
          background: "#fff",
          borderRadius: 26,
          boxShadow: "0 6px 40px #f06a8b15",
          padding: "36px 30px",
          flex: 1,
          minWidth: 320
        }}>
          <div style={{ color: "#f06a8b" }}>About Us</div>
          <h2 style={{
            fontSize: 28, color: "#384047", marginTop: 8, marginBottom: 9, wordBreak: "break-word"
          }}>
            We Learn Smart Way To Build<br />Bright Future For Your Children
          </h2>
          <p style={{
            color: "#77677b", fontSize: 15, marginBottom: 12
          }}>
            <b>Gyan Dayini Classes</b> is committed to <b>all-round & positive learning</b>.
            We focus on academic excellence, modern teaching, & personal attention under Mrs. Pinkee Prajapati.
            Our students enjoy <span style={{ color: "#ff5a91" }}>Activity, Care, Practice & Results!</span>
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18, fontSize: 15, fontWeight: 500 }}>
            <ul style={{ margin: 0, marginRight: 25, padding: 0, listStyle: "none", color: "#4a73be" }}>
              <li>• Sport Activities</li>
              <li>• Outdoor Games</li>
              <li>• Nutritious Foods</li>
            </ul>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", color: "#c37222" }}>
              <li>• Highly Secured</li>
              <li>• Friendly Environment</li>
              <li>• Qualified Teacher</li>
            </ul>
          </div>
          <a href="/about" style={{
            marginTop: 16, display: "inline-block",
            background: "#ff5a91", color: "#fff", borderRadius: 8,
            padding: "11px 32px", fontWeight: 700, textDecoration: "none",
            fontSize: 18, boxShadow: "0 2px 12px #f06a8b33"
          }}>
            More Details
          </a>
        </div>
      </div>
    </section>
  );
}

const playBtnStyle = {
  position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
  width: 58, height: 58, background: "#ff5a91",
  color: "#fff", fontSize: 32, borderRadius: "50%",
  boxShadow: "0 2px 20px #ff5a919e", display: "flex",
  alignItems: "center", justifyContent: "center",
  transition: "box-shadow 0.2s", zIndex: 3,
  border: "2px solid #fff", cursor: "pointer"
};
