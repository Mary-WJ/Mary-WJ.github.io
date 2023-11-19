let activePage = window.location.pathname;
//check the current location pathname
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    //if the link href contains the same value of activePage then add class called 'active'
    if(link.href.includes(`${activePage}`)){
        link.classList.add('active');
    }
})