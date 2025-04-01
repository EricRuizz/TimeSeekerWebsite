import '/style.css';
import '/project/CSS/Pages/GamePageStyle.css';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () =>
{
    history.replaceState({}, "", document.querySelector('meta[name="page-identifier"]')?.getAttribute("content") || "");

    gsap.to(".background", {
        y: "25vh",
        ease: "none",
        scrollTrigger: {
            start: "top top",
            scrub: 0,
        },
    });
});