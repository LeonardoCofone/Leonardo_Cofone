const links = [
  { 
    label: 'GitHub', 
    url: 'https://github.com/LeonardoCofone', 
    subtitle: 'Code and projects' 
  },
  { 
    label: 'Kaggle', 
    url: 'https://www.kaggle.com/zlatan599', 
    subtitle: 'Code and competitions' 
  },
  { 
    label: 'LinkedIn', 
    url: 'https://www.linkedin.com/in/leonardo-cofone-914228361/', 
    subtitle: 'My professional profile' 
  },
  { 
    label: 'Instagram', 
    url: 'https://www.instagram.com/leo.cofonee/', 
    subtitle: 'Personal life' 
  },
];

function makeHostname(href) {
  try { 
    return new URL(href).hostname.replace('www.', ''); 
  }
  catch { 
    return href.startsWith('mailto:') 
      ? href.replace('mailto:', '') 
      : href; 
  }
}

const faviconMap = {
  GitHub: 'images/github.png',
  Kaggle: 'images/kaggle.png',
  LinkedIn: 'images/linkedin.png',
  Instagram: 'images/instagram.png',
};

function createTile({ label, url, subtitle }) {
  const favicon = faviconMap[label] || 'images/default.png';
  const a = document.createElement('a');
  a.href = url;
  a.target = url.startsWith('#') ? '_self' : '_blank';
  a.rel = 'noopener noreferrer';
  a.className = 'tile';
  a.innerHTML = `
    <div class="icon" aria-hidden="true">
      <img src="${favicon}" alt="${label} icon" width="20" height="20" />
    </div>
    <div class="meta">
      <div class="label">${label}</div>
      ${subtitle ? `<div class="subtitle">${subtitle}</div>` : ''}
    </div>
  `;
  return a;
}

function initGrid() {
  const grid = document.getElementById('linksGrid');
  links.forEach(link => grid.appendChild(createTile(link)));
}

function setYear() {
  const y = document.getElementById('year');
  y.textContent = new Date().getFullYear();
}

function hackingText(id, speed = 80) {
  const element = document.getElementById(id);
  if (!element) return;

  const text = element.textContent;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|";
  let iterations = 0;

  function animate() {
    element.textContent = text
      .split("")
      .map((letter, index) => {
        if (index < iterations) return text[index];
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    iterations += 0.3;

    if (iterations < text.length) {
      setTimeout(() => requestAnimationFrame(animate), speed / 3);
    } else {
      element.textContent = text;
    }
  }

  requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", () => {
  initGrid();
  setYear();

  hackingText("hackingNameTitle", 100);

  if (window.innerWidth >= 1100) {
    hackingText("hackingNameSubtitle", 1);
  }
});