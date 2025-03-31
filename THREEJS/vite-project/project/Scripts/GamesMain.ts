import '/style.css';
import '/project/CSS/GamesStyle.css';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



gsap.registerPlugin(ScrollTrigger);

history.replaceState({}, "", "/Games");


class GridCell
{
    private cell: Element
    private content: Element;
    private hover: Element | null;
    private selectorBars: (Element | null)[];
    private previewGIF: Element | null;
    private selectorBanner: Element | null;
    
    private cellHeight: string;
    private cellWidth: string;
    
    private selectorBarHeight: number;
    private selectorBarWidth: number;

    private mouseEnterTL: gsap.core.Timeline;

    constructor(cell: Element)
    {
        this.cell = cell;
        this.content = cell.querySelector(".content") || cell;
        this.hover = cell.querySelector(".selector");
        this.selectorBars = [...this.hover?.querySelectorAll(".selector-bar") || []];
        this.previewGIF = this.content.querySelector(".preview");
        this.selectorBanner = this.hover?.querySelector(".selector-banner") || cell;

        // # === Resizing relevant variables === #
        this.cellHeight = "";
        this.cellWidth = "";
        
        this.selectorBarHeight = 0;
        this.selectorBarWidth = 0;

        this.mouseEnterTL = gsap.timeline();
        // # === Resizing relevant variables === #

        this.InitResizingRelevantVariables();

        window.addEventListener("resize", () => this.OnWindowResize());
    }

    public InitResizingRelevantVariables(): void
    {
        this.cellHeight = window.getComputedStyle(this.cell).getPropertyValue("height") as string;
        this.cellWidth = window.getComputedStyle(this.cell).getPropertyValue("width") as string;
        
        this.selectorBarHeight = Number(this.cellHeight.substring(0, this.cellHeight.length - 2)) * selectorBarHeightCoef;
        this.selectorBarWidth = Number(this.cellWidth.substring(0, this.cellWidth.length - 2)) * selectorBarWidthCoef;

        this.mouseEnterTL = gsap.timeline({ paused: true })
        .set(this.selectorBars, { opacity: 1 })
        .to(this.selectorBars, { height: this.selectorBarHeight, duration: d_sHeight }, 0)
        .to(this.selectorBars, { width: this.selectorBarWidth, duration: d_sWidth }, ">")
        .to(this.selectorBanner, { height: this.cellHeight, duration: d_bannerAnim }, 0)
        .to(this.previewGIF, { opacity: 1, duration: d_bannerAnim }, 0)
        .to(this.content, { height: "100%", duration: d_bannerAnim }, 0);
    }

    public Init()
    {
        this.cell.addEventListener("mouseenter", () => this.MouseEnter());
        this.cell.addEventListener("mouseleave", () => this.MouseLeave());
    }

    private MouseEnter()
    {
        this.mouseEnterTL.restart();
    }

    private MouseLeave()
    {
        this.mouseEnterTL.reverse();
    }

    private OnWindowResize()
    {
        this.InitResizingRelevantVariables();
    }
}

var gridCells: GridCell[];

//SYNTAX - d(uration)_name
const d_bannerAnim = 0.15 as number;
const d_sHeight = 0.15 as number;
const d_sWidth = 0.05 as number;

const selectorBarHeightCoef = 1.05 as number;
const selectorBarWidthCoef = 0.05 as number;


document.addEventListener("DOMContentLoaded", () =>
{
    history.replaceState({}, "", document.querySelector('meta[name="page-identifier"]')?.getAttribute("content") || "");

    gridCells = [...document.querySelectorAll(".cell")].map(cellElement => new GridCell(cellElement));
    gridCells.forEach(gridCell => { gridCell.Init() });

    gsap.to(".parallaxBackground", {
        y: "40vh",
        ease: "none",
        scrollTrigger: {
            scrub: 0,
        }
    });
});
