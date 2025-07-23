import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ExpertTeamSection.css";

const teachers = [
  { img: "/images/team/teacher1.jpg", name: "Linda Carlson", role: "English Teacher" },
  { img: "/images/team/teacher2.jpg", name: "Komal Mishra", role: "Maths Teacher" },
  { img: "/images/team/teacher3.jpg", name: "Nishant Singh", role: "Science Teacher" },
  { img: "/images/team/teacher4.jpg", name: "Rahul Jain", role: "Hindi Teacher" }
];

const sliderSettings = {
  infinite: true,
  speed: 800,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: true,
  dots: true,
  pauseOnHover: true,
  responsive: [
    { breakpoint: 1000, settings: { slidesToShow: 2 } },
    { breakpoint: 620, settings: { slidesToShow: 1 } }
  ]
};

export default function ExpertTeamSection() {
  return (
    <section className="expert-team-section">
      <div className="team-head">
        <div className="team-label">Our Team</div>
        <h2>Meet With Our<br />Expert Teacher</h2>
      </div>
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {teachers.map((teacher, i) => (
            <div key={i} className="team-slide">
              <div className="team-card">
                <div className="team-imgbox">
                  <img src={teacher.img} alt={teacher.name} />
                  <div className="team-social-box">
                    <a href="#"><i className="fab fa-facebook-f" /></a>
                    <a href="#"><i className="fab fa-twitter" /></a>
                    <a href="#"><i className="fab fa-instagram" /></a>
                  </div>
                </div>
                <div className="team-name">{teacher.name}</div>
                <div className="team-role">{teacher.role}</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
