import { 
  profileConfig, 
  badgesConfig, 
  tagsConfig, 
  socialConfig, 
  connectionsConfig, 
  themesConfig,
  animationConfig,
  audioConfig
} from './config.js';

// DOM Elements
const DOM = {
  // Profile Elements
  avatar: document.querySelector('.profile-avatar'),
  username: document.querySelector('.username'),
  discriminator: document.querySelector('.discriminator'),
  bio: document.querySelector('.profile-bio'),
  statusEmoji: document.querySelector('.status-emoji'),
  statusText: document.querySelector('.status-text'),
  activityTitle: document.querySelector('.activity-title'),
  activityDescription: document.querySelector('.activity-description'),
  activityIcon: document.querySelector('.activity-icon-img'),
  progressBar: document.querySelector('.progress-bar'),
  timeText: document.querySelector('.time-text'),
  followersCount: document.getElementById('followers-count'),
  projectsCount: document.getElementById('projects-count'),
  likesCount: document.getElementById('likes-count'),
  lastUpdated: document.getElementById('last-updated'),
  badgesContainer: document.querySelector('.badges-container'),
  tagsContainer: document.querySelector('.tags-container'),
  socialLinks: document.querySelector('.social-links'),
  connectionsGrid: document.querySelector('.connections-grid'),

  // Theme Elements
  themePanel: document.querySelector('.theme-panel'),
  themeGrid: document.querySelector('.theme-grid'),
  themeBtn: document.querySelector('.theme-btn'),

  // Settings Elements
  settingsPanel: document.querySelector('.settings-panel'),
  settingsBtn: document.querySelector('.settings-btn'),
  avatarAnimationToggle: document.getElementById('avatar-animation'),
  particlesEnabledToggle: document.getElementById('particles-enabled'),
  cursorEffectsToggle: document.getElementById('cursor-effects'),
  particleDensitySlider: document.getElementById('particle-density'),
  particleDensityValue: document.querySelector('#particle-density + .value-display'),
  animationSpeedSlider: document.getElementById('animation-speed'),
  animationSpeedValue: document.querySelector('#animation-speed + .value-display'),

  // Game Elements
  gamePanel: document.querySelector('.game-panel'),
  gameBtn: document.querySelector('.game-btn'),
  gameCanvas: document.getElementById('game-canvas'),
  startGameBtn: document.getElementById('start-game'),
  resetGameBtn: document.getElementById('reset-game'),
  gameScore: document.getElementById('game-score'),
  highScore: document.getElementById('high-score'),
  gameLevel: document.getElementById('game-level'),

  // Music Elements
  musicToggle: document.querySelector('.music-toggle'),
  volumeSlider: document.getElementById('volume-slider'),
  bgMusic: document.getElementById('bg-music'),

  // Cursor Elements
  customCursor: document.querySelector('.custom-cursor'),
  cursorTrail: document.querySelector('.cursor-trail'),

  // Other Elements
  closePanelBtns: document.querySelectorAll('.close-panel'),
  profileCard: document.querySelector('.profile-card'),
  avatarContainer: document.querySelector('.avatar-container'),
  statusIndicator: document.querySelector('.status-indicator'),
  statusRipple: document.querySelector('.status-ripple')
};

// Initialize Profile
function initProfile() {
  // Set profile data
  DOM.avatar.src = `https://cdn.discordapp.com/avatars/${profileConfig.id}/${profileConfig.avatar}.webp?size=512`;
  DOM.username.textContent = profileConfig.username;
  DOM.discriminator.textContent = `#${profileConfig.discriminator}`;
  DOM.bio.textContent = profileConfig.bio;
  
  // Set status
  DOM.statusEmoji.className = `fas ${profileConfig.status.emoji}`;
  DOM.statusText.textContent = profileConfig.status.text;
  
  // Set activity
  DOM.activityTitle.textContent = profileConfig.activity.name;
  DOM.activityDescription.textContent = profileConfig.activity.details;
  DOM.activityIcon.className = `fas ${profileConfig.activity.icon}`;
  DOM.progressBar.style.width = `${profileConfig.activity.progress}%`;
  DOM.timeText.textContent = profileConfig.activity.time;
  
  // Set stats
  animateCounter(DOM.followersCount, profileConfig.stats.followers);
  animateCounter(DOM.projectsCount, profileConfig.stats.projects);
  animateCounter(DOM.likesCount, profileConfig.stats.likes);
  DOM.lastUpdated.textContent = profileConfig.lastUpdated;
  
  // Create badges
  badgesConfig.forEach(badge => {
    const badgeElement = document.createElement('div');
    badgeElement.className = 'badge';
    badgeElement.setAttribute('data-tooltip', badge.tooltip);
    badgeElement.innerHTML = `<i class="fas ${badge.icon}"></i>`;
    DOM.badgesContainer.appendChild(badgeElement);
  });
  
  // Create tags
  tagsConfig.forEach(tag => {
    const tagElement = document.createElement('span');
    tagElement.className = 'tag';
    tagElement.textContent = `#${tag}`;
    DOM.tagsContainer.appendChild(tagElement);
  });
  
  // Create social links
  socialConfig.forEach(social => {
    const socialLink = document.createElement('a');
    socialLink.className = `social-link ${social.platform}`;
    socialLink.href = social.url;
    socialLink.target = '_blank';
    socialLink.innerHTML = `
      <i class="${social.icon}"></i>
      <span>${social.name}</span>
    `;
    DOM.socialLinks.appendChild(socialLink);
  });
  
  // Create connections
  connectionsConfig.forEach(connection => {
    const connectionElement = document.createElement('div');
    connectionElement.className = 'connection';
    connectionElement.innerHTML = `
      <div class="connection-icon">
        <i class="${connection.icon}"></i>
      </div>
      <div class="connection-details">
        <div class="connection-platform">${connection.platform.charAt(0).toUpperCase() + connection.platform.slice(1)}</div>
        <div class="connection-username">${connection.username}</div>
      </div>
    `;
    DOM.connectionsGrid.appendChild(connectionElement);
  });
}

// Initialize Themes
function initThemes() {
  themesConfig.forEach(theme => {
    const themeOption = document.createElement('div');
    themeOption.className = 'theme-option';
    themeOption.dataset.theme = theme.name;
    themeOption.innerHTML = `
      <div class="theme-preview" style="background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%);"></div>
      <span>${theme.name.charAt(0).toUpperCase() + theme.name.slice(1)}</span>
    `;
    DOM.themeGrid.appendChild(themeOption);
  });

  // Load saved theme or use default
  const savedTheme = localStorage.getItem('theme') || 'default';
  setTheme(savedTheme);
}

// Set Theme
function setTheme(themeName) {
  const theme = themesConfig.find(t => t.name === themeName);
  if (!theme) return;

  // Update CSS variables
  document.documentElement.style.setProperty('--primary-color', theme.primary);
  document.documentElement.style.setProperty('--secondary-color', theme.secondary);
  document.documentElement.style.setProperty('--background-color', theme.background);
  document.documentElement.style.setProperty('--card-color', theme.card);
  document.documentElement.style.setProperty('--text-color', theme.text);

  // Save theme preference
  localStorage.setItem('theme', themeName);
}

// Initialize Animations
function initAnimations() {
  // Avatar float animation
  if (animationConfig.avatarFloat) {
    DOM.avatarContainer.classList.add('floating');
  }

  // Status animation
  setInterval(cycleStatus, animationConfig.statusCycleInterval);

  // Initialize particles if enabled
  if (animationConfig.particleEffects) {
    initParticles();
  }

  // Initialize cursor effects if enabled
  if (animationConfig.cursorEffects) {
    initCursorEffects();
  }
}

// Cycle through status indicators
function cycleStatus() {
  const statuses = ['online', 'idle', 'dnd', 'offline'];
  const currentStatus = DOM.statusIndicator.classList[1];
  let nextIndex = (statuses.indexOf(currentStatus) + 1;
  if (nextIndex >= statuses.length) nextIndex = 0;
  
  const nextStatus = statuses[nextIndex];
  
  // Update status indicator
  DOM.statusIndicator.className = 'status-indicator';
  DOM.statusIndicator.classList.add(nextStatus);
  
  // Create ripple effect
  DOM.statusRipple.className = 'status-ripple';
  DOM.statusRipple.classList.add(nextStatus);
  DOM.statusRipple.style.animation = 'ripple 1s ease-out';
  
  setTimeout(() => {
    DOM.statusRipple.style.animation = '';
  }, 1000);
}

// Initialize Particles
function initParticles() {
  const particlesContainer = document.querySelector('.particles');
  particlesContainer.innerHTML = '';

  for (let i = 0; i < animationConfig.particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2px and 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation duration
    const duration = Math.random() * 
      (animationConfig.floatDuration.max - animationConfig.floatDuration.min) + 
      animationConfig.floatDuration.min;
    particle.style.animationDuration = `${duration}s`;
    
    // Random delay
    particle.style.animationDelay = `${Math.random() * 10}s`;
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    
    particlesContainer.appendChild(particle);
  }
}

// Initialize Cursor Effects
function initCursorEffects() {
  document.addEventListener('mousemove', (e) => {
    DOM.customCursor.style.left = `${e.clientX}px`;
    DOM.customCursor.style.top = `${e.clientY}px`;
    
    // Trail follows with a delay
    setTimeout(() => {
      DOM.cursorTrail.style.left = `${e.clientX}px`;
      DOM.cursorTrail.style.top = `${e.clientY}px`;
    }, 100);
  });

  // Interactive elements hover effects
  const interactiveElements = document.querySelectorAll(
    'a, button, .badge, .tag, .social-link, .connection, .theme-option, .game-btn, .toggle-switch'
  );

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      DOM.customCursor.style.width = '40px';
      DOM.customCursor.style.height = '40px';
      DOM.customCursor.style.backgroundColor = 'rgba(var(--primary-color-rgb), 0.4)';
    });
    
    el.addEventListener('mouseleave', () => {
      DOM.customCursor.style.width = '20px';
      DOM.customCursor.style.height = '20px';
      DOM.customCursor.style.backgroundColor = 'rgba(var(--primary-color-rgb), 0.2)';
    });
  });
}

// Initialize Audio
function initAudio() {
  if (!audioConfig.enabled) return;

  // Set initial volume
  DOM.bgMusic.volume = audioConfig.volume;
  DOM.volumeSlider.value = audioConfig.volume;

  // Music toggle
  DOM.musicToggle.addEventListener('click', () => {
    if (DOM.bgMusic.paused) {
      DOM.bgMusic.play();
      DOM.musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    } else {
      DOM.bgMusic.pause();
      DOM.musicToggle.innerHTML = '<i class="fas fa-music-slash"></i>';
    }
  });

  // Volume control
  DOM.volumeSlider.addEventListener('input', (e) => {
    DOM.bgMusic.volume = e.target.value;
  });
}

// Initialize Event Listeners
function initEventListeners() {
  // Theme panel toggle
  DOM.themeBtn.addEventListener('click', () => {
    DOM.themePanel.classList.toggle('panel-active');
    DOM.settingsPanel.classList.remove('panel-active');
    DOM.gamePanel.classList.remove('panel-active');
  });

  // Settings panel toggle
  DOM.settingsBtn.addEventListener('click', () => {
    DOM.settingsPanel.classList.toggle('panel-active');
    DOM.themePanel.classList.remove('panel-active');
    DOM.gamePanel.classList.remove('panel-active');
  });

  // Game panel toggle
  DOM.gameBtn.addEventListener('click', () => {
    DOM.gamePanel.classList.toggle('panel-active');
    DOM.themePanel.classList.remove('panel-active');
    DOM.settingsPanel.classList.remove('panel-active');
  });

  // Close panels
  DOM.closePanelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.theme-panel, .settings-panel, .game-panel').classList.remove('panel-active');
    });
  });

  // Theme selection
  document.addEventListener('click', (e) => {
    if (e.target.closest('.theme-option')) {
      const themeName = e.target.closest('.theme-option').dataset.theme;
      setTheme(themeName);
    }
  });

  // Settings controls
  DOM.avatarAnimationToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
      DOM.avatarContainer.classList.add('floating');
    } else {
      DOM.avatarContainer.classList.remove('floating');
    }
  });

  DOM.particlesEnabledToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
      initParticles();
    } else {
      document.querySelector('.particles').innerHTML = '';
    }
  });

  DOM.cursorEffectsToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
      initCursorEffects();
    } else {
      // Disable cursor effects
      DOM.customCursor.style.display = 'none';
      DOM.cursorTrail.style.display = 'none';
    }
  });

  DOM.particleDensitySlider.addEventListener('input', (e) => {
    const value = e.target.value;
    DOM.particleDensityValue.textContent = value;
    animationConfig.particleCount = parseInt(value);
    if (DOM.particlesEnabledToggle.checked) {
      initParticles();
    }
  });

  DOM.animationSpeedSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    DOM.animationSpeedValue.textContent = `${value}x`;
    document.documentElement.style.setProperty('--transition-speed', `${value}s`);
  });

  // Initialize game if enabled
  if (gameConfig.enabled) {
    initGame();
  }
}

// Animate counter
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      clearInterval(timer);
      current = target;
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 20);
}

// Initialize the app
function initApp() {
  initProfile();
  initThemes();
  initAnimations();
  initAudio();
  initEventListeners();
}

// Start the app
document.addEventListener('DOMContentLoaded', initApp);
