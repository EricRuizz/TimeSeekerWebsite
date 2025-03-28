import '/style.css';
import '/project/CSS/GamesStyle.css';

import { gsap } from "gsap";
import { HelixCurve } from 'three/examples/jsm/curves/CurveExtras';
//import { ScrollTrigger } from "gsap/ScrollTrigger";
//import { ScrollToPlugin } from "gsap/ScrollToPlugin";

//gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

history.replaceState({}, "", "/Games");



const previewCardHeight = "80%" as string;
const selectorHeight = "38.5vh" as string;
const selectorWidth = "1vw" as string;

//SYNTAX - d(uration)_name
const d_bannerAnim = 0.15 as number;
const d_sHeight = 0.15 as number;
const d_sWidth = 0.05 as number;

document.addEventListener("DOMContentLoaded", () =>
{
    document.querySelectorAll(".content").forEach(card =>
    {
        gsap.set(card, { height: previewCardHeight });

        card.addEventListener("mouseenter", () =>
        {
            const section = card.closest(".section");
            const selectors: (Element | null | undefined)[] = [card.previousElementSibling?.previousElementSibling, card.previousElementSibling];
            const previewGIF = card.querySelector(".previewGIF");
            const previewBanner = section?.querySelector(".previewBanner");

            gsap.set(selectors, { opacity: 1 });
            var tl = gsap.timeline();
            tl.to(selectors, { height: selectorHeight, duration: d_sHeight }, 0);
            tl.to(selectors, { width: selectorWidth, duration: d_sWidth }, ">");
            if (previewBanner) tl.to(previewBanner, { height: "20vh", duration: d_bannerAnim }, 0);
            tl.to(previewGIF, { opacity: 1, duration: d_bannerAnim }, 0);
            tl.to(card, { height: "100%", duration: d_bannerAnim }, 0);
        });
    
        card.addEventListener("mouseleave", () =>
        {
            const section = card.closest(".section");
            const selectors: (Element | null | undefined)[] = [card.previousElementSibling?.previousElementSibling, card.previousElementSibling];
            const previewGIF = card.querySelector(".previewGIF");
            const previewBanner = section?.querySelector(".previewBanner");
            
            var tl = gsap.timeline();
            tl.to(selectors, { width: "0%", duration: d_sWidth }, 0);
            tl.to(selectors, { height: "0%", duration: d_sHeight }, ">");
            tl.set(selectors, { opacity: 0 }, ">");
            if (previewBanner) tl.to(previewBanner, { height: "0vh", duration: d_bannerAnim }, 0);
            tl.to(previewGIF, { opacity: 0, duration: d_bannerAnim }, 0);
            tl.to(card, { height: previewCardHeight, duration: d_bannerAnim }, 0);
        });
    });    
});