// Profile Configuration
export const profileConfig = {
  id: "1186206505658220597",
  username: "DarkPlusX",
  discriminator: "9292",
  avatar: "f2f0804d53d3863c8646baca897b7514",
  bio: "🌟 Full-stack Developer | Open Source Contributor | UI/UX Designer | Coffee Enthusiast | Digital Artist | Tech Blogger | Open Source Maintainer | Community Manager",
  status: {
    text: "Working on my next big project!",
    emoji: "fa-smile"
  },
  activity: {
    name: "Visual Studio Code",
    details: "Working on profile-card.html",
    icon: "fa-code",
    progress: 75,
    time: "2h 45m"
  },
  stats: {
    followers: 1234,
    projects: 42,
    likes: 5678
  },
  lastUpdated: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
};

// Badges Configuration
export const badgesConfig = [
  { icon: "fa-check", tooltip: "Discord Staff" },
  { icon: "fa-heart", tooltip: "Partnered Server Owner" },
  { icon: "fa-shield-alt", tooltip: "Certified Moderator" },
  { icon: "fa-bolt", tooltip: "Early Supporter" },
  { icon: "fa-bug", tooltip: "Bug Hunter" }
];

// Tags Configuration
export const tagsConfig = [
  "developer",
  "opensource",
  "javascript",
  "design",
  "webdev",
  "react",
  "nodejs",
  "typescript"
];

// Social Links Configuration
export const socialConfig = [
  { platform: "discord", url: "https://discord.com/users/YOUR_ID", icon: "fab fa-discord", name: "Discord" },
  { platform: "github", url: "https://github.com/YOUR_GITHUB", icon: "fab fa-github", name: "GitHub" },
  { platform: "twitter", url: "https://twitter.com/YOUR_TWITTER", icon: "fab fa-twitter", name: "Twitter" },
  { platform: "youtube", url: "https://youtube.com/YOUR_YOUTUBE", icon: "fab fa-youtube", name: "YouTube" },
  { platform: "twitch", url: "https://twitch.tv/YOUR_TWITCH", icon: "fab fa-twitch", name: "Twitch" }
];

// Connections Configuration
export const connectionsConfig = [
  { platform: "github", username: "@yourusername", icon: "fab fa-github" },
  { platform: "twitter", username: "@yourhandle", icon: "fab fa-twitter" },
  { platform: "steam", username: "gamertag", icon: "fab fa-steam" },
  { platform: "spotify", username: "musiclover", icon: "fab fa-spotify" }
];

// Themes Configuration
export const themesConfig = [
  { 
    name: "default", 
    primary: "#5865F2", 
    secondary: "#ed64a6", 
    background: "#1e1e2e",
    card: "#2a2a3a",
    text: "#f0f0f5"
  },
  { 
    name: "dark", 
    primary: "#5865F2", 
    secondary: "#ed64a6", 
    background: "#121218",
    card: "#1a1a24",
    text: "#e0e0e5"
  },
  { 
    name: "light", 
    primary: "#5865F2", 
    secondary: "#ed64a6", 
    background: "#f5f5fa",
    card: "#ffffff",
    text: "#333344"
  },
  { 
    name: "pink", 
    primary: "#ff73b3", 
    secondary: "#ff4081", 
    background: "#1e0e1a",
    card: "#2a1a26",
    text: "#f8bbd0"
  },
  { 
    name: "green", 
    primary: "#4caf50", 
    secondary: "#8bc34a", 
    background: "#0e1e10",
    card: "#1a2a1c",
    text: "#dcedc8"
  },
  { 
    name: "purple", 
    primary: "#9c27b0", 
    secondary: "#673ab7", 
    background: "#140a1a",
    card: "#201a30",
    text: "#e1bee7"
  },
  { 
    name: "cyber", 
    primary: "#00ffcc", 
    secondary: "#ff00aa", 
    background: "#0a0a20",
    card: "#151530",
    text: "#00ffcc"
  },
  { 
    name: "sunset", 
    primary: "#ff7e5f", 
    secondary: "#feb47b", 
    background: "#1a0a14",
    card: "#2a1a24",
    text: "#ffd3b6"
  }
];

// Game Configuration
export const gameConfig = {
  enabled: true,
  difficulty: {
    easy: { speed: 3, spawnRate: 60 },
    medium: { speed: 5, spawnRate: 40 },
    hard: { speed: 7, spawnRate: 20 }
  },
  defaultDifficulty: "medium",
  colors: {
    player: "#5865F2",
    enemy: "#ed4245",
    projectile: "#faa81a",
    powerup: "#3ba55c"
  },
  playerSize: 30,
  enemySizes: [20, 30, 40],
  powerupTypes: ["shield", "speed", "multishot"]
};

// Animation Configuration
export const animationConfig = {
  avatarFloat: true,
  particleEffects: true,
  cursorEffects: true,
  particleCount: 30,
  floatDuration: { min: 15, max: 30 },
  statusCycleInterval: 5000
};

// Audio Configuration
export const audioConfig = {
  enabled: true,
  volume: 0.5,
  tracks: [
    { name: "background", src: "assets/background.mp3" },
    { name: "click", src: "assets/click.wav" },
    { name: "gameStart", src: "assets/game-start.wav" },
    { name: "gameOver", src: "assets/game-over.wav" }
  ]
};
