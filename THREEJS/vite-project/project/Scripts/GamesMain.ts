import '/style.css';
import '/project/CSS/GamesStyle.css';

import { gsap } from "gsap";
import { HelixCurve } from 'three/examples/jsm/curves/CurveExtras';
//import { ScrollTrigger } from "gsap/ScrollTrigger";
//import { ScrollToPlugin } from "gsap/ScrollToPlugin";

//gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

history.replaceState({}, "", "/Games");



document.addEventListener("DOMContentLoaded", () =>
{
    document.querySelectorAll(".cell").forEach(cell =>
    {
        const contentHeight = "80%" as string;
        const selectorHeight = "38.5vh" as string;
        const selectorWidth = "1vw" as string;
        
        //SYNTAX - d(uration)_name
        const d_bannerAnim = 0.15 as number;
        const d_sHeight = 0.15 as number;
        const d_sWidth = 0.05 as number;

        const content = cell.querySelector(".content") || cell;
        const hover = cell.querySelector(".selector");
        const hSelectors: (Element | null | undefined)[] = [...hover?.querySelectorAll(".selector-bar") || []];
        const previewGIF = content.querySelector(".preview");
        const hBanner = hover?.querySelector(".selector-banner");

        const contentHeightA = window.getComputedStyle(content).getPropertyValue("height") as string;

        cell.addEventListener("mouseenter", () =>
        {
            gsap.set(hSelectors, { opacity: 1 });
            var tl = gsap.timeline();
            tl.to(hSelectors, { height: selectorHeight, duration: d_sHeight }, 0);
            tl.to(hSelectors, { width: selectorWidth, duration: d_sWidth }, ">");
            if (hBanner) tl.to(hBanner, { height: "20vh", duration: d_bannerAnim }, 0);
            tl.to(previewGIF, { opacity: 1, duration: d_bannerAnim }, 0);
            tl.to(content, { height: "100%", duration: d_bannerAnim }, 0);
        });
    
        cell.addEventListener("mouseleave", () =>
        {            
            var tl = gsap.timeline();
            tl.to(hSelectors, { width: "0%", duration: d_sWidth }, 0);
            tl.to(hSelectors, { height: "0%", duration: d_sHeight }, ">");
            tl.set(hSelectors, { opacity: 0 }, ">");
            if (hBanner) tl.to(hBanner, { height: "0vh", duration: d_bannerAnim }, 0);
            tl.to(previewGIF, { opacity: 0, duration: d_bannerAnim }, 0);
            tl.to(content, { height: contentHeightA, duration: d_bannerAnim }, 0);
        });
    });    
});