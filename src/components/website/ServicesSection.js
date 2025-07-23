import React from "react";
import "./ServicesSection.css";

const cardData = [
    {
        icon: "🎮",
        title: "Study & Game",
        description: "Study and play together! Personalized support with engaging activities for holistic growth.",
        active: false
    },
    {
        icon: "🔤",
        title: "A to Z Programs",
        description: "Comprehensive learning curriculum from alphabet basics to advanced projects.",
        active: false
    },
    {
        icon: "👩‍🏫",
        title: "Expert Teacher",
        description: "Guidance from experienced educators ensuring personal attention and excellence.",
        active: false
    },
    {
        icon: "🩺",
        title: "Mental Health",
        description: "Caring environment for every child's emotional and social well-being.",
        active: false
    }
];

export default function ServicesSection() {
    return (
        <section style={{ background: "linear-gradient(180deg, #fff1f7 60%, #faebef 100%)", padding: "64px 0" }}>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
                <div style={{ color: "#ff6b9c", fontWeight: 600, fontSize: 22, marginBottom: 8, letterSpacing: ".05em" }}>
                    What We Do
                </div>
                <h2 style={{ fontWeight: 700, fontSize: 36, color: "#373969", margin: 0, letterSpacing: "-0.5px" }}>
                    Thanks To Get Started<br />With Our School
                </h2>
            </div>
            <div className="services-section-cards">
                {cardData.map((card, idx) => (
                    <div
                        key={card.title}
                        className={`service-card${card.active ? " active" : ""}`}
                        tabIndex={0}
                    >
                        <div className="icon">{card.icon}</div>
                        <div style={{ fontWeight: 600, fontSize: 20, color: "#ff4b89", marginBottom: 11 }}>{card.title}</div>
                        <div style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.5, marginBottom: 32, minHeight: 65, textAlign: "center" }}>
                            {card.description}
                        </div>
                        <button style={{
                            background: card.active ? "#fff" : "#ff79a9",
                            color: card.active ? "#5d75fa" : "#fff",
                            border: "none",
                            borderRadius: "8px",
                            padding: "9px 24px",
                            fontWeight: 600,
                            fontSize: 16,
                            cursor: "pointer",
                            transition: ".2s"
                        }}>
                            Read More
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
