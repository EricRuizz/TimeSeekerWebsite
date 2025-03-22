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
import { eventNames } from 'process';
import { duplexPair } from 'stream';



enum PageSelectorItemType {
    Games,
    Art,
    Music,
    Others
}

var isPreviewCardShown = false as boolean;
var isHoveringPageSelectorItem = false as boolean;

var pageSelectorContentGames: HTMLElement | null;
var pageSelectorContentArt: HTMLElement | null;
var pageSelectorContentMusic: HTMLElement | null;
var pageSelectorContentOthers: HTMLElement | null;

var previewCard: HTMLElement | null;
var previewCardStripeTop: HTMLElement | null;
var previewCardStripeBot: HTMLElement | null;

var previewCardImageGames: HTMLElement | null;
var previewCardImageArt: HTMLElement | null;
var previewCardImageMusic: HTMLElement | null;
var previewCardImageOthers: HTMLElement | null;

var currentPreviewCardImage: HTMLElement | null;

var previewImageDictionary: { [key in PageSelectorItemType]: HTMLElement | null };
const stripeScrollTextDuration = 20;

document.addEventListener("DOMContentLoaded", () => {
    //Event class
    pageSelectorContentGames = document.querySelector(".pageSelectorContent.games");
    pageSelectorContentArt = document.querySelector(".pageSelectorContent.art");
    pageSelectorContentMusic = document.querySelector(".pageSelectorContent.music");
    pageSelectorContentOthers = document.querySelector(".pageSelectorContent.others");

    pageSelectorContentGames?.addEventListener("mouseenter", () => HoveredPageSelectorItem(PageSelectorItemType.Games));
    pageSelectorContentArt?.addEventListener("mouseenter", () => HoveredPageSelectorItem(PageSelectorItemType.Art));
    pageSelectorContentMusic?.addEventListener("mouseenter", () => HoveredPageSelectorItem(PageSelectorItemType.Music));
    pageSelectorContentOthers?.addEventListener("mouseenter", () => HoveredPageSelectorItem(PageSelectorItemType.Others));

    pageSelectorContentGames?.addEventListener("mouseleave", () => UnhoveredPageSelectorItem());
    pageSelectorContentArt?.addEventListener("mouseleave", () => UnhoveredPageSelectorItem());
    pageSelectorContentMusic?.addEventListener("mouseleave", () => UnhoveredPageSelectorItem());
    pageSelectorContentOthers?.addEventListener("mouseleave", () => UnhoveredPageSelectorItem());

    //Affected classes
    previewCard = document.querySelector(".previewCard");
    previewCardStripeTop = document.querySelector(".previewCardStripe.top");
    previewCardStripeBot = document.querySelector(".previewCardStripe.bot");

    previewCardImageGames = document.querySelector(".previewCardImage.games");
    previewCardImageArt = document.querySelector(".previewCardImage.art");
    previewCardImageMusic = document.querySelector(".previewCardImage.music");
    previewCardImageOthers = document.querySelector(".previewCardImage.others");

    currentPreviewCardImage = previewCardImageGames;

    previewImageDictionary = {
        [PageSelectorItemType.Games]: previewCardImageGames,
        [PageSelectorItemType.Art]: previewCardImageArt,
        [PageSelectorItemType.Music]: previewCardImageMusic,
        [PageSelectorItemType.Others]: previewCardImageOthers
    };

    //Preview card stripe scroll
    createScrollingAnimation(".previewCardStripeText.top", "top");
    createScrollingAnimation(".previewCardStripeText.bot", "bot");

});

function createScrollingAnimation(selector: string, type: "top" | "bot") {
    const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;

    gsap.set(elements, {
      x: (i) => window.innerWidth * [0, 0.25, 0.5, 0.75][i]
    });

    elements.forEach((el) => {
      function animate()
      {
        const currentXPosition = gsap.getProperty(el, "x") as number || 0;
        const endXPosition = type === "bot" ? window.innerWidth : -el.offsetWidth;
        const distance = Math.abs(endXPosition - currentXPosition);
        const referenceDistance = type === "bot" ? window.innerWidth : window.innerWidth + el.offsetWidth; 
        const duration = stripeScrollTextDuration * (distance / referenceDistance);

        gsap.to(el, {
          x: endXPosition,
          duration: duration,
          ease: "linear",
          onComplete: () => {
            gsap.set(el, { x: type === "bot" ? -el.offsetWidth : window.innerWidth }); //Reset position
            animate(); //Reset animation
          }
        });
      }

      animate();
    });
}

function HoveredPageSelectorItem(type: PageSelectorItemType)
{
    isHoveringPageSelectorItem = true;

    if(isPreviewCardShown == false)
    {
        ShowPreviewCard();
    }
    HoveredPageSelectorItemType(type);
}

function ShowPreviewCard()
{
    isPreviewCardShown = true;

    ElementToggleVisibilityAnimation(previewCard, "show");
    setTimeout(() =>
    {
        ElementToggleVisibilityAnimation(previewCardStripeTop, "show");
        ElementToggleVisibilityAnimation(previewCardStripeBot, "show");
    }, 100);
}

function HoveredPageSelectorItemType(type: PageSelectorItemType)
{
    currentPreviewCardImage?.classList.toggle("show", false);
    currentPreviewCardImage = previewImageDictionary[type];
    currentPreviewCardImage?.classList.toggle("show", true);
}

function UnhoveredPageSelectorItem()
{
    isHoveringPageSelectorItem = false;

    setTimeout(() =>
    {
        if(isPreviewCardShown && !isHoveringPageSelectorItem)
        {
            HidePreviewCard();
        }
    }, 50);
}

function HidePreviewCard()
{
    isPreviewCardShown = false;

    ElementToggleVisibilityAnimation(previewCard, "hide");
    setTimeout(() =>
    {
        ElementToggleVisibilityAnimation(previewCardStripeTop, "hide");
        ElementToggleVisibilityAnimation(previewCardStripeBot, "hide");
    }, 100);
}

function ElementToggleVisibilityAnimation(element: HTMLElement | null, action: "show" | "hide")
{
    element?.classList.remove("show", "hide");
    void element?.offsetHeight;
    element?.classList.add(action);
}