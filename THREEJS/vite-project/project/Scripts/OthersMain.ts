import '/style.css';
import '/project/CSS/OthersStyle.css';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

history.replaceState({}, "", "/Others");



document.addEventListener("DOMContentLoaded", () =>
{
    gsap.to(".parallaxBackground", {
        y: (document.documentElement.scrollHeight * 0.02).toString() + "vh",
        ease: "none",
        scrollTrigger: {
            scrub: 0,
        }
    });
});