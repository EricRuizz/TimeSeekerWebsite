import '/style.css';
import '/project/CSS/GamesStyle.css';

import { gsap } from "gsap";
import { HelixCurve } from 'three/examples/jsm/curves/CurveExtras';
//import { ScrollTrigger } from "gsap/ScrollTrigger";
//import { ScrollToPlugin } from "gsap/ScrollToPlugin";

//gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

history.replaceState({}, "", "/Games");



const previewCardHeight = "80%" as string;

const bannerAnimDuration = 0.15 as number;

document.addEventListener("DOMContentLoaded", () =>
{
    document.querySelectorAll(".previewCard").forEach(card =>
    {
        gsap.set(card, { height: previewCardHeight });

        card.addEventListener("mouseenter", () =>
        {
            const section = card.closest(".section");
            const nextSelector = card.nextElementSibling;
            const previewBanner = section?.querySelector(".previewBanner");
    
            if (nextSelector && nextSelector.classList.contains("previewSelector")) {
                gsap.to(nextSelector, { opacity: 1, y: -10, duration: bannerAnimDuration });
            }
    
            if (previewBanner) {
                gsap.to(previewBanner, { height: "20vh", duration: bannerAnimDuration });
            }

            gsap.to(card, { height: "100%", duration: bannerAnimDuration });
        });
    
        card.addEventListener("mouseleave", () =>
        {
            const section = card.closest(".section");
            const nextSelector = card.nextElementSibling;
            const previewBanner = section?.querySelector(".previewBanner");
    
            if (nextSelector && nextSelector.classList.contains("previewSelector")) {
                gsap.to(nextSelector, { opacity: 0, y: 0, duration: bannerAnimDuration });
            }
    
            if (previewBanner) {
                gsap.to(previewBanner, { height: "0vh", duration: bannerAnimDuration });
            }

            gsap.to(card, { height: previewCardHeight, duration: bannerAnimDuration });
        });
    });    
});