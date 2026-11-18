(() => {
  const canvas = document.getElementById("matrix-rain");
  const ctx = canvas.getContext("2d");
  const chars = "アカサタナハマヤラワ012345789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let width, height, columns, drops, fontSize = 15, frame;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(1);
  }
  function draw() {
    ctx.fillStyle = "rgba(5, 9, 7, 0.075)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#00ff66";
    ctx.font = `${fontSize}px monospace`;
    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    frame = requestAnimationFrame(draw);
  }
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  resize();
  if (!reduceMotion) draw();
  window.addEventListener("resize", resize);

  const menuButton = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  menuButton.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));

  document.getElementById("year").textContent = new Date().getFullYear();
})();
