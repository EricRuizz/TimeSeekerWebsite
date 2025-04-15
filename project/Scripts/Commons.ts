import '/style.css';

import { IsHardwareAccelerationOff } from './Utils';

class ImageCarousel
{
    private imageCarousel: HTMLElement;

    private currentIndex: number; 

    private images: HTMLElement[];
    private carouselImageIndicator: HTMLElement[];

    private nextButton : HTMLElement;
    private previousButton : HTMLElement;

    constructor(imageCarousel: HTMLElement)
    {
        this.imageCarousel = imageCarousel;

        this.currentIndex = 1;
        
        this.images = [...imageCarousel.getElementsByClassName("carouselImage")] as HTMLElement[];
        let ciiParent = imageCarousel.nextElementSibling as HTMLElement;
        this.carouselImageIndicator = [...ciiParent.getElementsByClassName("carouselImageIndicator")] as HTMLElement[];

        this.nextButton = imageCarousel.querySelector(".icNext") as HTMLElement;
        this.previousButton = imageCarousel.querySelector(".icPrev") as HTMLElement;

        this.Init();
    }

    private Init()
    {
        this.carouselImageIndicator.forEach((indicator, index) => { indicator.addEventListener("click", () => this.SetIndex(index + 1)); });

        for (let i = 0; i < this.images.length; i++) {
            this.images[i].style.display = "none";  
        }

        this.nextButton.addEventListener("click", () => this.ChangeImage(1));
        this.previousButton.addEventListener("click", () => this.ChangeImage(-1));

        this.SetIndex(this.currentIndex);
    }

    private ChangeImage(direction: number)
    {
        this.ImageSwaping(this.currentIndex += direction);
    }

    private SetIndex(newIndex: number)
    {
        this.ImageSwaping(this.currentIndex = newIndex);
    }

    private ImageSwaping(newIndex: number)
    {
        if (newIndex > this.images.length)  { this.currentIndex = 1 }
        if (newIndex < 1)                   { this.currentIndex = this.images.length }

        for (let i = 0; i < this.images.length; i++) {
            this.images[i].style.display = "none";  
        }
        for (let i = 0; i < this.carouselImageIndicator.length; i++) {
            this.carouselImageIndicator[i].className = this.carouselImageIndicator[i].className.replace(" ciActive", "");
        }

        this.images[this.currentIndex - 1].style.display = "flex";  
        this.images[this.currentIndex - 1].style.alignItems = "center";  
        this.carouselImageIndicator[this.currentIndex - 1].className += " ciActive";
    }
}

class Modal
{
    private modal: HTMLElement;
    private inputElements: NodeListOf<HTMLElement>;

    constructor(modal: HTMLElement, inputElements: NodeListOf<HTMLElement>)
    {        
        this.modal = modal;
        this.modal.addEventListener("click", event => this.CloseModal(event));

        this.inputElements = inputElements;
        this.inputElements.forEach((inputElement) => { inputElement.addEventListener("click", event => this.OpenModal(event)); });
               
    }

    OpenModal(event: MouseEvent)
    {
        this.inputElements.forEach(inputElement =>
        {
            if(inputElement == event.target as HTMLElement)
            {
                this.modal.style.display = "block";
                document.body.classList.add("no-scroll");
            }
        });
        
    }

    CloseModal(event: MouseEvent)
    {        
        if((event.target as HTMLElement).classList.contains("modalCloser"))
        {
            this.modal.style.display = "none";
            document.body.classList.remove("no-scroll");
        }
    }
}

var imageCarousels: ImageCarousel[];
var modals: Modal[];

document.addEventListener("DOMContentLoaded", function ()
{
    /*
    const basePath = process.env.NODE_ENV === 'production' ? '/TimeSeekerWebsite/' : '/';
    const pageIdentifier = document.querySelector('meta[name="page-identifier"]')?.getAttribute("content");

    if (pageIdentifier)
        {
        history.replaceState({}, "", `${basePath}${pageIdentifier}`);
    }
    */

    if(IsHardwareAccelerationOff())
    {
        LowPerformanceBackground();
    }
    
    // Header
    const header = document.querySelector(".header");
    if(header != null)
    {
        window.addEventListener("scroll", () => 
        {
            if (window.scrollY > 0)
            {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    //Image Carousels
    imageCarousels = [...document.querySelectorAll(".imageCarousel")].map(imageCarousel => new ImageCarousel(imageCarousel as HTMLElement));

    //Modals
    modals = [...document.querySelectorAll(".modal")].map(modal => new Modal(modal as HTMLElement, modal.parentElement!.querySelectorAll(".modalInteractable")! as NodeListOf<HTMLElement>));

    //Enhance performance for no Hardware Acceleration
    if(IsHardwareAccelerationOff())
    {
        document.querySelectorAll<HTMLElement>("*").forEach(el => {
            const style = getComputedStyle(el);
            
            if (style.filter.includes("blur") || style.backdropFilter.includes("blur")) {
              el.classList.add("disable-blur");
            }
        });
    }
});

function LowPerformanceBackground(): void
{
    const topText = document.createElement("div");
    topText.style.backgroundColor = "red";
    topText.style.width = "100%";
    topText.innerText = "Please turn ON Hardware Acceleration for a better experience";
    topText.style.textAlign = "center";
    topText.style.position = "fixed";
    topText.style.top = "14px";
    topText.style.left = "50%";
    topText.style.transform = "translateX(-50%)";
    topText.style.fontSize = "1.5rem";
    topText.style.fontWeight = "bold";
    topText.style.color = "black";
    document.body.appendChild(topText);
}