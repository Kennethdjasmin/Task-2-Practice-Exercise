feather.replace();

      
      
      // Mobile Dropdown Menu
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
      });

      
      
      // Mobile Version Carousel
      const mq = window.matchMedia('(max-width: 768px)');
      if (mq.matches) initMobileCarousel();

      function initMobileCarousel() {
        const carousel = document.querySelector('.carousel');
        if (!carousel) return;

        const card = carousel.querySelector('.card');
        if (!card) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener("pointerdown", (e) => {
          isDown = true;
          startX = e.pageX - carousel.offsetLeft;
          scrollLeft = carousel.scrollLeft;
          carousel.classList.add("is-dragging");
        });

        carousel.addEventListener("pointerleave", () => { isDown = false; carousel.classList.remove("is-dragging"); });
        carousel.addEventListener("pointerup", () => { isDown = false; carousel.classList.remove("is-dragging"); });
        carousel.addEventListener("pointermove", (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - carousel.offsetLeft;
          const walk = (x - startX);
          carousel.scrollLeft = scrollLeft - walk;
        });
      }
      
      
      
      // Stars Particle Random location
      function generateShadows(n) {
        let shadows = [];
        for (let i = 0; i < n; i++) {
          let x = Math.floor(Math.random() * 2000);
          let y = Math.floor(Math.random() * 2000);
          shadows.push(`${x}px ${y}px #FFF`);
        }
        return shadows.join(", ");
      }

      document.documentElement.style.setProperty("--shadows-small", generateShadows(700));
      document.documentElement.style.setProperty("--shadows-medium", generateShadows(200));
      document.documentElement.style.setProperty("--shadows-big", generateShadows(100));
      
      
      
      // Navbar Change When at Top
      window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (window.scrollY === 0) {
          header.classList.add("top");
        } else {
          header.classList.remove("top");
        }
      });

      window.dispatchEvent(new Event("scroll"));
      
      
      
      // Home Page Text Animation
      document.addEventListener("DOMContentLoaded", () => {
        const homeContent = document.querySelector("#home .home-content");

        setTimeout(() => {
          homeContent.classList.add("visible");
        }, 200);

        window.addEventListener("scroll", () => {
          if (window.scrollY > 100) {
            homeContent.classList.remove("visible");
            homeContent.classList.add("hidden");
          } else {
            homeContent.classList.remove("hidden");
            homeContent.classList.add("visible");
          }
        });
      });
      
      

      // Fade in Effect for Each Section Except Home Page (Prob will change that later)
      document.addEventListener("DOMContentLoaded", () => {
        const fadeContainers = document.querySelectorAll("section .container");

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                entry.target.classList.remove("hidden");
              } else {
                entry.target.classList.remove("visible");
                entry.target.classList.add("hidden");
              }
            });
          },
          { threshold: 0.2 }
        );

        fadeContainers.forEach(el => {
          if (el.closest("#home")) return;
          el.classList.add("hidden");
          observer.observe(el);
        });
      });
