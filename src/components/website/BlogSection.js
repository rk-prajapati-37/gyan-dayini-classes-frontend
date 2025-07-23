import React from "react";
import "./BlogSection.css";

// सभी images public/assets/images/ में डालें
const blogs = [
  {
    img: "/assets/images/blog1.jpg",
    date: "29 Nov 2023",
    comments: 15,
    author: {
      name: "Mary Mordern",
      image: "/assets/images/teacher-1.jpg",
      role: "Baby Care"
    },
    title: "How to pay attention to your child?",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus"
  },
  {
    img: "/assets/images/blog2.jpg",
    date: "29 Nov 2023",
    comments: 15,
    author: {
      name: "Mary Mordern",
      image: "/assets/images/teacher-1.jpg",
      role: "Baby Care"
    },
    title: "Play outdoor sports with your child",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus"
  },
  {
    img: "/assets/images/blog3.jpg",
    date: "29 Nov 2023",
    comments: 15,
    author: {
      name: "Mary Mordern",
      image: "/assets/images/teacher-1.jpg",
      role: "Baby Care"
    },
    title: "How to make time for your kids?",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus"
  }
];

export default function BlogSection() {
  return (
    <section className="blog-section">
      <div className="blog-head">
        <div className="blog-label">Latest News & Blog</div>
        <h2>Read Our Latest<br />News & Blog</h2>
      </div>
      <div className="blog-cards-row">
        {blogs.map((b, i) => (
          <div className="blog-card" key={i}>
            <div className="blog-img-wrap">
              <img src={b.img} alt={b.title} />
              <div className="blog-meta-top">
                <span><i className="far fa-calendar"></i>{b.date}</span>
                <span><i className="far fa-comments"></i>Comments ({b.comments})</span>
              </div>
            </div>
            <div className="blog-body">
              <div className="blog-author">
                <img src={b.author.image} alt={b.author.name} className="blog-author-img" />
                <div>
                  <span className="blog-author-name">{b.author.name}</span><br />
                  <span className="blog-author-role">{b.author.role}</span>
                </div>
              </div>
              <div className="blog-title">{b.title}</div>
              <div className="blog-desc">{b.desc}</div>
              <button className="blog-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
