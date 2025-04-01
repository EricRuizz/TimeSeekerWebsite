import '/style.css';

document.addEventListener("DOMContentLoaded", function ()
{
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

});