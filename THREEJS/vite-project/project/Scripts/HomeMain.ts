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
    Games = 0,
    Art = 1,
    Music = 2,
    Others = 3,
}

var isPreviewCardShown = false as boolean;
var isHoveringPageSelectorItem = false as boolean;

var previewCard: HTMLElement | null;
var previewCardStripeTop: HTMLElement | null;
var previewCardStripeBot: HTMLElement | null;

var pageSelectorContentGames: HTMLElement | null;
var pageSelectorContentArt: HTMLElement | null;
var pageSelectorContentMusic: HTMLElement | null;
var pageSelectorContentOthers: HTMLElement | null;

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

    //TODO - previewCard?.classList.add("TEST");
}

function HoveredPageSelectorItemType(type: PageSelectorItemType)
{
    if(type == PageSelectorItemType.Games)
    {

    }
    else if(type == PageSelectorItemType.Art)
    {

    }
    else if(type == PageSelectorItemType.Music)
    {

    }
    else if(type == PageSelectorItemType.Others)
    {

    }
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
    
}

//TODO - if "mouseleave" for 0.1 seconds, then make the preview card disappear
//TODO - only call previewCard.appear if previewCard is hiden 