import { gsap } from "gsap";

const blockClass = ".transitionBlock" as string;
const ease = "power4.inOut";

const startDuration =       0.35 as number;
const startEachDuration =   0.05 as number;
const revealDuration =      0.35 as number;
const revealEachDuration =  0.05 as number;

window.addEventListener("load", () =>
{
    document.querySelectorAll("a").forEach((link) => 
    {
        link.addEventListener("click", (event) =>
        {
            event.preventDefault();

            const href = link.getAttribute("href");

            if(href && !href.startsWith("#") && href !== window.location.pathname)
            {
                StartTransition().then(() => 
                {
                    window.location.href = href;
                })
            }
        })
    });

    function StartTransition()
    {
        return new Promise((Resolve) => 
        {
            gsap.set(blockClass, { visibility: "visible", scaleY: 0 });
            
            gsap.to(blockClass, 
                {
                    scaleY: 1,
                    duration: startDuration,
                    stagger: 
                    {
                        each: startEachDuration,
                        from: "start",
                        grid: [2, 5],
                        axis: "x"
                    },
                    ease: ease,
                    onComplete: Resolve,
                }
            )
        });
    }

    function RevealTransition()
    {
        return new Promise((Resolve) =>
        {
            gsap.set(blockClass, { scaleY: 1 });

            gsap.to(blockClass, 
                {
                    scaleY: 0,
                    duration: revealDuration,
                    stagger:
                    {
                        each: revealEachDuration,
                        from: "start",
                        grid: "auto",
                        axis: "x",
                    },
                    ease: ease,
                    onComplete: Resolve,
                }
            )
        });
    }

    RevealTransition().then(() => 
    {
        gsap.set(blockClass, { visibility: "hidden" });
    });
});