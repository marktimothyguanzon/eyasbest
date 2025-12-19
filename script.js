document.addEventListener('DOMContentLoaded', () => {
  // MOBILE MENU TOGGLE
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // FADE-IN ANIMATION
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      entry.target.classList.add('show');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // SIGNATURE PICKS CAROUSEL
  const track = document.querySelector('.carousel-track');
  if(track){
    const items = Array.from(track.children);
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let index = 0;

    const updateCarousel = () => {
      const itemWidth = items[0].offsetWidth + 14; // margin included
      const viewport = window.innerWidth;
      const visibleItems = viewport > 1024 ? 3 : viewport > 768 ? 2 : 1;
      const maxIndex = items.length - visibleItems;
      if(index > maxIndex) index = 0;
      if(index < 0) index = maxIndex;
      track.style.transform = `translateX(-${index * itemWidth}px)`;
    }

    prevBtn.addEventListener('click', () => {
      index--;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      index++;
      updateCarousel();
    });

    // AUTO SCROLL
    setInterval(() => {
      index++;
      updateCarousel();
    }, 5000);

    // RESIZE
    window.addEventListener('resize', updateCarousel);

    // INITIAL
    updateCarousel();
  }
});
