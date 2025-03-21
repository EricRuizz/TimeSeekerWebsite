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

    //Affected class
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
});

// HOVER PAGE SELECTOR ITEM
function HoveredPageSelectorItem(type: PageSelectorItemType)
{
    console.log("HoveredPageSelectorItem");
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

    //TODO - animate Mask
}

function HoveredPageSelectorItemType(type: PageSelectorItemType)
{
    console.log("CHANGE");
    currentPreviewCardImage?.classList.toggle("show", false);
    currentPreviewCardImage = previewImageDictionary[type];
    currentPreviewCardImage?.classList.toggle("show", true);
}

// UNHOVER PAGE SELECTOR ITEM
function UnhoveredPageSelectorItem()
{
    console.log("UnhoveredPageSelectorItem");
    isHoveringPageSelectorItem = false;

    setTimeout(() =>
    {
        if(isPreviewCardShown && !isHoveringPageSelectorItem)
        {
            HidePreviewCard();
        }
    }, 100);
}

function HidePreviewCard()
{
    console.log("Hide PreviewCard");
    currentPreviewCardImage?.classList.toggle("show", false);
    currentPreviewCardImage = null;

    //TODO - actually hide the div
}