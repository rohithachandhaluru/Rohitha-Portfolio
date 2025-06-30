'use strict';

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  setTimeout(() => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
  }, 100);
});

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .service-item, .project-item, .testimonials-item');
hoverElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)';
    cursorFollower.style.transform = 'scale(1.5)';
    cursorFollower.style.opacity = '0.8';
  });
  
  element.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)';
    cursorFollower.style.opacity = '0.6';
  });
});

// Scroll-based animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      
      // Animate skill bars when skills section is visible
      if (entry.target.closest('.skills-list')) {
        animateSkillBars();
      }
      
      // Animate timeline items with stagger
      if (entry.target.classList.contains('timeline-item')) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
          item.style.setProperty('--i', index);
        });
      }
    }
  });
}, observerOptions);

// Observe elements for scroll animations
const animatedElements = document.querySelectorAll('.animate-on-scroll, .service-item, .timeline-item, .skills-list, .project-item, .testimonials-item');
animatedElements.forEach(element => {
  observer.observe(element);
});

// Skill bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      const width = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    }, index * 200);
  });
}

// Typewriter effect for name
function typewriterEffect() {
  const nameElement = document.querySelector('.name');
  if (nameElement) {
    const text = nameElement.textContent;
    nameElement.textContent = '';
    nameElement.style.borderRight = '2px solid var(--accent-primary)';
    nameElement.style.animation = 'blink 1s infinite';
    
    let i = 0;
    const timer = setInterval(() => {
      nameElement.textContent += text[i];
      i++;
      if (i === text.length) {
        clearInterval(timer);
        setTimeout(() => {
          nameElement.style.borderRight = 'none';
          nameElement.style.animation = 'none';
        }, 1000);
      }
    }, 150);
  }
}

// Initialize typewriter effect when page loads
window.addEventListener('load', () => {
  setTimeout(typewriterEffect, 500);
});

// Smooth scroll for navbar links
function smoothScroll() {
  const navLinks = document.querySelectorAll('[data-nav-link]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = link.textContent.toLowerCase();
      const targetElement = document.querySelector(`[data-page="${targetPage}"]`);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Enhanced page navigation with smooth transitions
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link, index) => {
  link.addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase();
    
    // Remove active class from all pages and links
    pages.forEach(page => page.classList.remove("active"));
    navigationLinks.forEach(navLink => navLink.classList.remove("active"));
    
    // Add active class to clicked link
    this.classList.add("active");
    
    // Find and activate target page with animation
    pages.forEach(page => {
      if (page.dataset.page === targetPage) {
        setTimeout(() => {
          page.classList.add("active");
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    });
  });
});

// Enhanced sidebar functionality
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

// Testimonials modal functionality
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Portfolio filter functionality
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", function () {
    this.classList.toggle("active");
  });
}

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    select.classList.remove("active");
    filterFunc(selectedValue);
  });
});

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "all" || selectedValue === "websites") {
      item.classList.add("active");
    } else if (selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Filter buttons for larger screens
let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// Enhanced project hover effects
const projectItems = document.querySelectorAll('.project-item');
projectItems.forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) rotateX(5deg)';
    this.style.boxShadow = 'var(--shadow-hover)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) rotateX(0)';
    this.style.boxShadow = 'var(--shadow-glass)';
  });
});

// Parallax effect for floating elements
function createFloatingElements() {
  const main = document.querySelector('main');
  
  for (let i = 0; i < 5; i++) {
    const floatingElement = document.createElement('div');
    floatingElement.className = 'floating-element';
    floatingElement.style.cssText = `
      position: fixed;
      width: ${Math.random() * 100 + 50}px;
      height: ${Math.random() * 100 + 50}px;
      background: var(--accent-gradient);
      border-radius: 50%;
      opacity: 0.05;
      pointer-events: none;
      z-index: -1;
      top: ${Math.random() * 100}vh;
      left: ${Math.random() * 100}vw;
      animation: float ${Math.random() * 20 + 10}s infinite linear;
    `;
    
    document.body.appendChild(floatingElement);
  }
}

// CSS for floating animation
const floatingCSS = `
  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-30px) rotate(120deg); }
    66% { transform: translateY(30px) rotate(240deg); }
    100% { transform: translateY(0px) rotate(360deg); }
  }
`;

const style = document.createElement('style');
style.textContent = floatingCSS;
document.head.appendChild(style);

// Initialize floating elements
createFloatingElements();

// Enhanced scroll effects
let ticking = false;

function updateScrollEffects() {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  
  // Parallax effect for floating elements
  const floatingElements = document.querySelectorAll('.floating-element');
  floatingElements.forEach((element, index) => {
    const speed = (index + 1) * 0.1;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
  
  ticking = false;
}

function requestScrollUpdate() {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
}

window.addEventListener('scroll', requestScrollUpdate);

// Enhanced button hover effects
const buttons = document.querySelectorAll('button, .glass-button');
buttons.forEach(button => {
  button.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px) scale(1.02)';
    this.style.boxShadow = 'var(--shadow-glow)';
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = 'var(--shadow-glass)';
  });
});

// Smooth page transitions
function initPageTransitions() {
  const articles = document.querySelectorAll('article');
  
  articles.forEach(article => {
    article.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  });
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', function() {
  smoothScroll();
  initPageTransitions();
  
  // Add stagger animation to service items
  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Add stagger animation to project items
  const projectItemsStagger = document.querySelectorAll('.project-item');
  projectItemsStagger.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
});

// Performance optimization
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Debounced scroll handler
const debouncedScrollHandler = debounce(requestScrollUpdate, 10);
window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});