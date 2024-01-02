

        //nav bar
        let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


//nav bar scroll 
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop-150;
        let heihgt = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + heihgt){
            navlinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*='+id+']').classList.add('active');

            });

        };

    });



let header = document.querySelector('header');
header.classList.toggle('sticky',window.scrollY > 100);
}

     



//background dots animation and number
         for (let i = 1; i <= 75; i++) {
          const dotWrapper = document.createElement("div");
          dotWrapper.className = `dotWrapper dotWrapper-${i}`;
          const dot = document.createElement("div");
          dot.className = `dot dot-${i}`;
          dotWrapper.appendChild(dot);
          document.querySelector(".bg").appendChild(dotWrapper);
  
          // Apply dynamic styles
          dotWrapper.style.top = `${Math.random() * 100}%`;
          dotWrapper.style.left = `${Math.random() * 100}%`;
  
          // Apply individual animation delays
          dot.style.animationDelay = `${Math.random() * 5}s`;
        }










          // carte incubation

        const speed = 4.5;
        const r = gsap.timeline({ repeat: -1 });
        const o = gsap.timeline({ repeat: -1 });
        const h = gsap.timeline({ repeat: -1 });
        
        r.to("#app", {
            "--r": "180deg",
            "--p": "0%",
            duration: speed,
            ease: "sine.in"
        });
        r.to("#app", {
            "--r": "360deg",
            "--p": "100%",
            duration: speed,
            ease: "sine.out"
        });
        o.to("#app", {
            "--o": 1,
            duration: speed/2,
            ease: "power1.in"
        });
        o.to("#app", {
            "--o": 0,
            duration: speed/2,
            ease: "power1.out"
        });
        
        h.to("#app", {
            "--h": "100%",
            duration: speed/2,
            ease: "sine.in"
        });
        h.to("#app", {
            "--h": "50%",
            duration: speed/2,
            ease: "sine.out"
        });
        h.to("#app", {
            "--h": "0%",
            duration: speed/2,
            ease: "sine.in"
        });
        h.to("#app", {
            "--h": "50%",
            duration: speed/2,
            ease: "sine.out"
        });
        