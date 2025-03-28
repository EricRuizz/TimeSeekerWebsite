import '/style.css';
import '/project/CSS/GamesStyle.css';

import { gsap } from "gsap";

history.replaceState({}, "", "/Games");



document.addEventListener("DOMContentLoaded", () =>
{
    document.querySelectorAll(".cell").forEach(cell =>
    {        
        //SYNTAX - d(uration)_name
        const d_bannerAnim = 0.15 as number;
        const d_sHeight = 0.15 as number;
        const d_sWidth = 0.05 as number;

        const content = cell.querySelector(".content") || cell;
        const hover = cell.querySelector(".selector");
        const selectorBars: (Element | null | undefined)[] = [...hover?.querySelectorAll(".selector-bar") || []];
        const previewGIF = content.querySelector(".preview");
        const selectorBanner = hover?.querySelector(".selector-banner");

        const cellHeight = window.getComputedStyle(cell).getPropertyValue("height") as string;
        const cellWidth = window.getComputedStyle(cell).getPropertyValue("width") as string;
        const contentHeight = window.getComputedStyle(content).getPropertyValue("height") as string;

        const selectorBarHeightCoef = 1.05 as number;
        const selectorBarWidthCoef = 0.05 as number;
        const selectorBarHeight = Number(cellHeight.substring(0, cellHeight.length - 2)) * selectorBarHeightCoef;
        const selectorBarWidth = Number(cellWidth.substring(0, cellWidth.length - 2)) * selectorBarWidthCoef;

        gsap.set(selectorBars, { height: 0, width: 0 });

        cell.addEventListener("mouseenter", () =>
        {
            gsap.set(selectorBars, { opacity: 1 });
            var tl = gsap.timeline();
            tl.to(selectorBars, { height: selectorBarHeight, duration: d_sHeight }, 0);
            tl.to(selectorBars, { width: selectorBarWidth, duration: d_sWidth }, ">");
            if (selectorBanner) tl.to(selectorBanner, { height: cellHeight, duration: d_bannerAnim }, 0);
            tl.to(previewGIF, { opacity: 1, duration: d_bannerAnim }, 0);
            tl.to(content, { height: "100%", duration: d_bannerAnim }, 0);
        });
    
        cell.addEventListener("mouseleave", () =>
        {            
            var tl = gsap.timeline();
            tl.to(selectorBars, { width: "0%", duration: d_sWidth }, 0);
            tl.to(selectorBars, { height: "0%", duration: d_sHeight }, ">");
            tl.set(selectorBars, { opacity: 0 }, ">");
            if (selectorBanner) tl.to(selectorBanner, { height: "0vh", duration: d_bannerAnim }, 0);
            tl.to(previewGIF, { opacity: 0, duration: d_bannerAnim }, 0);
            tl.to(content, { height: contentHeight, duration: d_bannerAnim }, 0);
        });
    });    
});