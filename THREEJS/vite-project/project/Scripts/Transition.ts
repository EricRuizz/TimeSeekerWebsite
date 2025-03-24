import { gsap } from "gsap";

const blockClass = ".transitionBlock" as string;
const ease = "power4.inOut";

document.addEventListener("DOMContentLoaded", () =>
{
    document.querySelectorAll("a").forEach((link) => 
    {
        link.addEventListener("click", (event) =>
        {
            event.preventDefault();

            const href = link.getAttribute("href");

            if(href && !href.startsWith("#") && href !== window.location.pathname)
            {
                AnimateTransition().then(() => 
                {
                    window.location.href = href;
                })
            }
        })
    });

    function AnimateTransition()
    {
        return new Promise((Resolve) => 
        {
            gsap.set(blockClass, { visibility: "visible", scaleY: 0 })
            gsap.to(blockClass, 
                {
                    scaleY: 1,
                    duration: 1,
                    stagger: 
                    {
                        each: 0.1,
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
                    duration: 1,
                    stagger:
                    {
                        each: 0.1,
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