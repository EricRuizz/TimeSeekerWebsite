import '/style.css';

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
    private inputElement: HTMLElement;

    constructor(modal: HTMLElement, inputElement: HTMLElement)
    {
        console.log("constructor");
        
        this.modal = modal;
        this.modal.addEventListener("click", () => this.CloseModal());

        this.inputElement = inputElement;
        this.inputElement.addEventListener("click", () => this.OpenModal());
    }

    OpenModal()
    {
        this.modal.style.display = "block";
        console.log("block");
    }

    CloseModal()
    {
        this.modal.style.display = "none";
        console.log("AAAAAAAAA");
    }
}

var imageCarousels: ImageCarousel[];
var modals: Modal[];

document.addEventListener("DOMContentLoaded", function ()
{
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

    //Image Carousel
    imageCarousels = [...document.querySelectorAll(".imageCarousel")].map(imageCarousel => new ImageCarousel(imageCarousel as HTMLElement));
    modals = [...document.querySelectorAll(".modal")].map(modal => new Modal(modal as HTMLElement, modal.parentElement as HTMLElement));
});