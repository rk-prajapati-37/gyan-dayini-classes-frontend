import React from 'react';
import './EventSection.css';

const events = [
  {
    date: "29 Nov",
    image: "/assets/images/event1.jpg", // assets/images/public में रखें
    time: "10:00am - 12:00pm",
    location: "New York",
    title: "Music & drawing workshop",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus consectetur."
  },
  {
    date: "29 Nov",
    image: "/assets/images/event2.jpg",
    time: "10:00am - 12:00pm",
    location: "New York",
    title: "Why need study",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus consectetur."
  },
  {
    date: "29 Nov",
    image: "/assets/images/event3.jpg",
    time: "10:00am - 12:00pm",
    location: "New York",
    title: "Child health consciousness",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus consectetur."
  }
];

export default function EventSection() {
  return (
    <section className="events-section">
      <div className="events-head">
        <div className="events-title">Our Events</div>
        <h2>Our Upcoming Events</h2>
      </div>
      <div className="events-row">
        {events.map((ev, i) => (
          <div className="event-card" key={i}>
            <div className="event-image-area">
              <img src={ev.image} alt={ev.title} />
              <span className="event-date">{ev.date}</span>
            </div>
            <div className="event-info-bar">
              <span>
                <i className="far fa-clock"></i>
                {ev.time}
              </span>
              <span>
                <i className="fas fa-map-marker-alt"></i>
                {ev.location}
              </span>
            </div>
            <div className="event-body">
              <h3>{ev.title}</h3>
              <div className="event-desc">{ev.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
