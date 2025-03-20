import '/style.css';
import * as THREE from 'three';

import { gsap } from "gsap";
    
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";



document.addEventListener("DOMContentLoaded", () => {
    const previewCard = document.querySelector(".previewCard") as HTMLElement | null;
    const previewCardStripe = document.querySelector(".previewCardStripe") as HTMLElement | null;
    const pageSelectorContent = document.querySelector(".pageSelectorContent") as HTMLElement | null;
  
    if (previewCard && previewCardStripe && pageSelectorContent)
    {
        pageSelectorContent.addEventListener("mouseenter", () => {
            //TODO - previewCard.classList.add("active");
            //TODO - previewCardStripe.classList.add("active");

            //TODO - Search if I can simply call a function instead of "add" and "remove"
        });
  
        pageSelectorContent.addEventListener("mouseleave", () => {
            //TODO - previewCard.classList.remove("active");
            //TODO - previewCardStripe.classList.remove("active");

            //TODO - here add the "deactivate" function?
        });

    } else {
        console.log("CSS Elements not found");
    }
});
  