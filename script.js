const typewriter = document.getElementById("typewriter");
const texts = [
  "Hi, I'm Agrim Sharma, a Backend Developer.",
  "Hi, I'm Agrim Sharma, an ML Enthusiast.",
  "Hi, I'm Agrim Sharma, a Vibe Coder."
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = texts[textIndex];
  if (isDeleting) {
    typewriter.innerHTML = currentText.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  } else {
    typewriter.innerHTML = currentText.substring(0, charIndex++);
    if (charIndex > currentText.length) {
      isDeleting = true;
      charIndex = currentText.length;
      setTimeout(type, 2000); // Longer pause for better UX
      return;
    }
  }
  setTimeout(type, isDeleting ? 40 : 80); // Smoother typing speed
}

window.onload = () => {
  type();
  initParticles();
};

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Form submission with Formspree
const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusText.textContent = "Sending...";
  
  try {
    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      statusText.textContent = "Message sent successfully!";
      form.reset();
    } else {
      const errorData = await response.json();
      statusText.textContent = errorData.errors ? errorData.errors[0].message : "Something went wrong.";
    }
  } catch {
    statusText.textContent = "Network error. Please try again.";
  }
});

// Cursor effect
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.querySelectorAll('.resume-btn, .contact-link, .ml-svg, .project, .nav-links a').forEach(elem => {
  elem.addEventListener('mouseenter', () => cursor.classList.add('active'));
  elem.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// Hero image tilt effect
const heroImage = document.getElementById('hero-image');
document.addEventListener('mousemove', (e) => {
  const rect = heroImage.getBoundingClientRect();
  const x = e.clientX - (rect.left + rect.width / 2);
  const y = e.clientY - (rect.top + rect.height / 2);
  const tiltX = (y / rect.height) * 15; // Reduced for smoother effect
  const tiltY = -(x / rect.width) * 15;
  heroImage.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
});

// ML SVG animations
document.querySelectorAll('.ml-svg').forEach(svg => {
  svg.addEventListener('mouseenter', () => {
    const paths = svg.querySelectorAll('path, circle, rect');
    paths.forEach(path => {
      path.style.transition = 'stroke-dasharray 0.4s ease';
      path.style.strokeDasharray = '6,6';
    });
  });
  svg.addEventListener('mouseleave', () => {
    const paths = svg.querySelectorAll('path, circle, rect');
    paths.forEach(path => {
      path.style.strokeDasharray = 'none';
    });
  });
});

// Particle background
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const numParticles = 60;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 4 + 1;
      this.speedX = Math.random() * 1.5 - 0.75;
      this.speedY = Math.random() * 1.5 - 0.75;
      this.color = `hsl(${Math.random() * 60 + 160}, 70%, 60%)`; // Teal to purple hues
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.2) this.size -= 0.008;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function createParticles() {
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    particles.forEach((particle, i) => {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particle.x - particles[j].x;
        const dy = particle.y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 184, 148, ${1 - distance / 100})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(animateParticles);
  }

  createParticles();
  animateParticles();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}