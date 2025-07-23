import React from "react";
import Slider from "react-slick";
import "./TestimonialsSection.css";

const testimonials = [
  { img: "/images/parent1.jpg", name: "Anil Sharma", profession: "Parent", rating: 5, text: "Gyan Dayini की टीम बच्चों की प्रोग्रेस और फीस सब कुछ क्लियर रखती है। Highly recommended!" },
  { img: "/images/parent2.jpg", name: "Suman Devi", profession: "Parent", rating: 5, text: "Caring environment, teachers का behavior बहुत अच्छा है—बच्चे अच्छे marks ला रहे हैं।" },
  { img: "/images/parent3.jpg", name: "Rakesh Singh", profession: "Parent", rating: 4, text: "My kids enjoy studies and activities both, thanks to GDC’s caring faculty." }
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  arrows: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  pauseOnHover: true,
  responsive: [
    { breakpoint: 1100, settings: { slidesToShow: 2 } },
    { breakpoint: 700, settings: { slidesToShow: 1 } }
  ]
};

export default function TestimonialsSection() {
  return (
    <section className="testimonial-section">
      <div className="testi-head">
        <span className="testi-label">Our Testimonials</span>
        <h2 className="testi-main-title">Parents Say About Us</h2>
      </div>
      <div className="testi-slider-container">
        <Slider {...sliderSettings}>
          {testimonials.map((t, i) => (
            <div key={i}>
              <div className="testi-card">
                <div className="testi-card-row">
                  <div className="testi-avatar">
                    <img src={t.img} alt={t.name} />
                  </div>
                  <div>
                    <div className="testi-client">
                      {t.name}
                      <span className="testi-quote">
                        <i className="fas fa-quote-right"></i>
                      </span>
                    </div>
                    <div className="testi-prof">{t.profession}</div>
                    <div className="testi-stars">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <i key={j} className="fas fa-star" />
                      ))}
                    </div>
                  </div>
                </div>
                <hr className="testi-divider" />
                <div className="testi-content">{t.text}</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
