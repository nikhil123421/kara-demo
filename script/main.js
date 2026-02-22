function animateCounter(element, target, duration, label) {
    let startTime = null;
    const startValue = 0;
  
    function updateCounter(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const currentValue = Math.min(startValue + (progress / duration) * target, target);
  
      element.textContent = Math.floor(currentValue) + label;
  
      if (progress < duration) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + label; // Ensure it ends exactly at the target
      }
    }
  
    requestAnimationFrame(updateCounter);
  }
  
  // Set up IntersectionObserver
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target);
          const label = entry.target.dataset.label || '';
          const duration = 2000; // Example: Animate each counter in 2 seconds
          animateCounter(entry.target, target, duration, label);
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% visible
  );
  
  // Observe all counter elements
  counters.forEach(counter => observer.observe(counter));
  document.addEventListener("DOMContentLoaded", () => {
    const customCursor = document.createElement("div");
    customCursor.classList.add("custom-cursor");
    customCursor.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#f1f1f1" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
    `;
    document.body.appendChild(customCursor);
  
    const scrollContainers = document.querySelectorAll(".accordion-horizontal-scroll");
  
    document.addEventListener("mousemove", (e) => {
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
    });
  
    scrollContainers.forEach((scrollContainer) => {
      scrollContainer.addEventListener("mouseenter", () => {
        customCursor.style.transform = "scale(1)";
      });
  
      scrollContainer.addEventListener("mouseleave", () => {
        customCursor.style.transform = "scale(0)";
      });
    });

    // Section transition animation
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Unobserve after animation
            // observer.unobserve(entry.target);
          }
          // Optional: Remove class when section is not in view
          // else {
          //   entry.target.classList.remove('visible');
          // }
        });
      },
      {
        threshold: 0.15, // Trigger when 15% of the section is visible
        rootMargin: '0px' // No margin
      }
    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  });

  window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        // If scrolled down more than 50px from absolute top, hide it. Otherwise show it.
        if (window.scrollY > 50) {
          navbar.classList.add('navbar-hidden');
        } else {
          navbar.classList.remove('navbar-hidden');
        }
      });

  // Hero background animation – subtle floating particles (premium, light theme)
(function() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  const PARTICLE_COUNT = 60;
  const COLORS = ['#ff7a3d', '#ffb08c', '#d4d4d4', '#f0f0f0'];

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.4 + 0.2
      });
    }
  }

  function resizeCanvas() {
    width = window.innerWidth;
    height = document.querySelector('.hero-section').offsetHeight;
    canvas.width = width;
    canvas.height = height;
    initParticles();
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      
      // move
      p.x += p.speedX;
      p.y += p.speedY;

      // wrap around edges (soft)
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    }
    requestAnimationFrame(drawParticles);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  resizeCanvas();
  drawParticles();
})();

// Navbar scroll effect (add background class, keep hide behaviour)
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled');
    navbar.classList.add('navbar-hidden');   // hide on scroll down (existing)
  } else {
    navbar.classList.remove('navbar-scrolled');
    navbar.classList.remove('navbar-hidden');
  }
});

// Stop video when modal is closed
const videoModal = document.getElementById('videoModal');
if (videoModal) {
  videoModal.addEventListener('hide.bs.modal', function () {
    const iframe = document.getElementById('videoIframe');
    if (iframe) {
      iframe.src = iframe.src; // force reload to stop playback
    }
  });
}
