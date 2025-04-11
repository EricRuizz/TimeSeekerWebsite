import '/style.css';
import '/project/CSS/Pages/GamePageStyle.css';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


document.addEventListener("DOMContentLoaded", () =>
{
    gsap.to(".background", {
        y: (document.documentElement.scrollHeight * 0.02).toString() + "vh",
        ease: "none",
        scrollTrigger: {
            start: "top top",
            scrub: 0,
        },
    });
});