// Profile Configuration
export const profileConfig = {
  id: "1186206505658220597",
  username: "darkplusx",
  discriminator: "9292",
  avatar: "f2f0804d53d3863c8646baca897b7514",
  bio: "🌟 Full-stack Developer | Open Source Contributor | UI/UX Designer | Coffee Enthusiast | Game Developer | Competitive Gamer | Chess Enthusiast",
  status: {
    text: "Playing Tic Tac Toe",
    emoji: "fa-smile"
  },
  activity: {
    name: "Playing Tic Tac Toe",
    details: "Current streak: 3 wins",
    icon: "fa-chess",
    progress: 75,
    time: "15m 22s"
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
  { icon: "fa-shield-alt", tooltip: "Certified Moderator" }
];

// Tags Configuration
export const tagsConfig = [
  "developer",
  "gamer",
  "javascript",
  "design",
  "competitive"
];

// Social Links Configuration
export const socialConfig = [
  { platform: "discord", url: "https://discord.com/users/YOUR_ID", icon: "fab fa-discord", name: "Discord" },
  { platform: "github", url: "https://github.com/YOUR_GITHUB", icon: "fab fa-github", name: "GitHub" },
  { platform: "twitter", url: "https://twitter.com/YOUR_TWITTER", icon: "fab fa-twitter", name: "Twitter" }
];

// Themes Configuration
export const themesConfig = [
  { 
    name: "default", 
    primary: "#5865F2", 
    secondary: "#ed64a6", 
    background: "#1e1e2e",
    card: "#2a2a3a",
    text: "#f0f0f5",
    xColor: "#faa81a",
    oColor: "#5865F2",
    winColor: "#3ba55c"
  },
  { 
    name: "dark", 
    primary: "#5865F2", 
    secondary: "#ed64a6", 
    background: "#121218",
    card: "#1a1a24",
    text: "#e0e0e5",
    xColor: "#faa81a",
    oColor: "#5865F2",
    winColor: "#3ba55c"
  },
  { 
    name: "light", 
    primary: "#5865F2", 
    secondary: "#ed64a6", 
    background: "#f5f5fa",
    card: "#ffffff",
    text: "#333344",
    xColor: "#faa81a",
    oColor: "#5865F2",
    winColor: "#3ba55c"
  },
  { 
    name: "pink", 
    primary: "#ff73b3", 
    secondary: "#ff4081", 
    background: "#1e0e1a",
    card: "#2a1a26",
    text: "#f8bbd0",
    xColor: "#ffeb3b",
    oColor: "#ff73b3",
    winColor: "#4caf50"
  },
  { 
    name: "green", 
    primary: "#4caf50", 
    secondary: "#8bc34a", 
    background: "#0e1e10",
    card: "#1a2a1c",
    text: "#dcedc8",
    xColor: "#ffc107",
    oColor: "#4caf50",
    winColor: "#2196f3"
  },
  { 
    name: "purple", 
    primary: "#9c27b0", 
    secondary: "#673ab7", 
    background: "#140a1a",
    card: "#201a30",
    text: "#e1bee7",
    xColor: "#ff9800",
    oColor: "#9c27b0",
    winColor: "#00bcd4"
  }
];

// Animation Configuration
export const animationConfig = {
  avatarFloat: true,
  particleEffects: true,
  cursorEffects: true,
  particleCount: 30,
  statusCycleInterval: 5000
};

// Audio Configuration
export const audioConfig = {
  enabled: true,
  volume: 0.5,
  tracks: [
    { name: "background", src: "assets/background.mp3" },
    { name: "click", src: "assets/click.wav" },
    { name: "win", src: "assets/win.mp3" }
  ]
};
