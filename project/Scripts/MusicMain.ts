import '/style.css';
import '/project/CSS/MusicStyle.css';

import { IsHardwareAccelerationOff } from "./Utils";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


document.addEventListener("DOMContentLoaded", () =>
{
    if(!IsHardwareAccelerationOff())
    {
        gsap.to(".background", {
            y: (document.documentElement.scrollHeight * 0.01).toString() + "vh",
            ease: "none",
            scrollTrigger: {
                start: "top top",
                scrub: 0,
            },
        });
    }
    
    document.querySelectorAll('.previewCell').forEach(preview => {
        const container: HTMLElement = preview.querySelector('.previewContainer')!;
        const HTMLPreview: HTMLElement = container;
      
    
        document.addEventListener('mousemove', e =>
        {
            const mouseEvent: MouseEvent = e as MouseEvent;
            const rect = HTMLPreview.getBoundingClientRect();
    
            const x = mouseEvent.clientX - rect.left;
            const y = mouseEvent.clientY - rect.top;
    
            var percentX = (x / rect.width) - 0.5;  
            var percentY = (y / rect.height) - 0.5;
    
            const factor = 2;
    
            const rotateX = percentY * factor * -1;
            const rotateY = percentX * factor;
    
            HTMLPreview.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    
        preview.addEventListener('mouseleave', () =>
        {
            HTMLPreview.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    });
});