import React from "react";
import "./ProgramsSection.css"; // आप ये css नीचे दिए code की तरह बनाएँ

const programs = [
  {
    title: "English For Today",
    image: "/assets/images/program-1.jpg", // अपनी image public/assets/images/ में डालें
    price: "$60.99",
    teacher: {
      name: "Mary Morden",
      image: "/assets/images/teacher-1.jpg",
      role: "Arts Designer"
    },
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus consectetur,",
    sits: 30,
    lessons: 11,
    hours: 60
  },
  {
    title: "Graphics Arts",
    image: "/assets/images/program-2.jpg",
    price: "$60.99",
    teacher: {
      name: "Mary Morden",
      image: "/assets/images/teacher-1.jpg",
      role: "Arts Designer"
    },
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus consectetur,",
    sits: 30,
    lessons: 11,
    hours: 60
  },
  {
    title: "General Science",
    image: "/assets/images/program-3.jpg",
    price: "$60.99",
    teacher: {
      name: "Mary Morden",
      image: "/assets/images/teacher-1.jpg",
      role: "Arts Designer"
    },
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus consectetur,",
    sits: 30,
    lessons: 11,
    hours: 60
  }
];

export default function ProgramsSection() {
  return (
    <section className="programs-section">
      <div className="section-head">
        <span>Our Programs</span>
        <h2>We Offer An Exclusive<br />Program For Kids</h2>
      </div>
      <div className="cards-row">
        {programs.map((prog, idx) => (
          <div className="prog-card" key={idx}>
            <div className="imgbox">
              <img src={prog.image} alt={prog.title} />
              <div className="prog-price">{prog.price}</div>
            </div>
            <div className="card-body">
              <div className="prog-title">{prog.title}</div>
              <div className="prog-desc">{prog.desc}</div>
            </div>
            <div className="card-bottom">
              <div className="teacher">
                <img src={prog.teacher.image} alt={prog.teacher.name} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{prog.teacher.name}</div>
                  <div className="role">{prog.teacher.role}</div>
                </div>
              </div>
              <div className="prog-stats-row">
                <span>
                  <i className="fas fa-wheelchair"></i>
                  <b>{prog.sits}</b> Sits
                </span>
                <span>
                  <i className="fas fa-book-open"></i>
                  <b>{prog.lessons}</b> Lessons
                </span>
                <span>
                  <i className="far fa-clock"></i>
                  <b>{prog.hours}</b> Hours
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 28 }}>
        <button className="view-btn">View All Programs</button>
      </div>
    </section>
  );
}
