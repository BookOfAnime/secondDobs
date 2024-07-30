import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Roadmap.css";

gsap.registerPlugin(ScrollTrigger);

const Roadmap = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const roadmapData = [
    {
      phase: "Phase 1",
      title: "Launch",
      description: "Launch the $DOBS token by initiating the token sale and listing it. Engage the community through social media campaigns, contests, and giveaways to build a strong, active following. Maintain transparency and build trust with regular updates and AMAs from the development team. Incentivize holding $DOBS by announcing benefits like exclusive access to upcoming projects and events. Our goals are to build a strong, engaged community and establish trust and transparency.",
    },
    {
      phase: "Phase 2",
      title: "Expansion",
      description: "Regular Community Challenges: We will host a series of interactive and engaging community challenges. These events will not only reward participants with tokens and NFTs but also foster a strong sense of community and collaboration.",
    },
    {
      phase: "Phase 3",
      title: "Evolution",
      description: "We're enhancing $DOBS by introducing a burn mechanism to reduce supply and increase value through transaction fees, burn events, and community milestones. New utility features like staking rewards, governance voting, and exclusive access to partner projects will offer more engagement opportunities. Additionally, an exclusive NFT collection purchasable with $DOBS will further boost its utility and value for all holders.",
    },
    {
      phase: "Phase 4",
      title: "Integration",
      description: "To expand the Dobs ecosystem, we will launch new memecoins and NFT projects, each providing unique value and utility for $DOBS holders. We will involve the community in the development of these projects through voting and feedback mechanisms, ensuring growth benefits everyone. Our focus on sustainable growth includes ongoing marketing efforts, community events, and strategic burns to support long-term success. These initiatives aim to continuously engage our community and drive the expansion of the Dobs ecosystem.",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${roadmapData.length * 100}%`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            snap: 1 / (roadmapData.length - 1),
          },
        });

        tl.to(sectionRef.current, {
          xPercent: -100 * (roadmapData.length - 1),
          ease: "none",
        });

        gsap.utils.toArray(".roadmap-card").forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            containerAnimation: tl,
            start: "left center",
            end: "right center",
            toggleClass: "active",
          });
        });
      }
    }, triggerRef);

    return () => ctx.revert();
  }, [roadmapData.length, isMobile]);

  return (
    <section className={`roadmap roadmap-section ${isMobile ? "mobile" : ""}`} ref={triggerRef}>
      <h2 className="roadmap-title">DOBSMAP</h2>
      <div className={`roadmap-container ${isMobile ? "mobile" : ""}`} ref={sectionRef}>
        <div className="roadmap-cards">
          {roadmapData.map((item, index) => (
            <div
              key={index}
              className={`roadmap-card ${index === roadmapData.length - 1 ? "last-card" : ""}`}
            >
              <div className="roadmap-card-content">
                <h3>{item.phase}: {item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;