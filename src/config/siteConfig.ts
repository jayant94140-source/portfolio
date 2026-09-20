export interface SkillItem {
  id: string;
  name: string;
  category: 'Development' | 'Creative' | 'AI / Automation' | 'Business';
  level: 'Learning' | 'Practicing' | 'Building';
  iconName?: string;
  enabled: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'Web Projects' | 'AI Tools' | 'YouTube Systems' | 'Automation' | 'Digital Products' | 'Experiments';
  techStack: string[];
  status: 'Idea' | 'Building' | 'Prototype' | 'Live' | 'Archived';
  whatILearned: string;
  githubUrl?: string;
  liveUrl?: string;
  demoBadge?: string;
  thumbnails?: string[];
  approved: boolean;
}

export interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  enabled: boolean;
}

export interface ExperimentItem {
  id: string;
  title: string;
  category: string;
  description: string;
  learnings: string;
  status: 'Active Exploration' | 'Testing' | 'Researching';
  enabled: boolean;
}

export interface BuildLogEntry {
  id: string;
  date: string;
  title: string;
  summary: string;
  tags: string[];
  approved: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  iconName: string;
  enabled: boolean;
}

export interface SiteConfig {
  owner: {
    name: string;
    location: string;
    roleTagline: string;
    headline: string;
    subheading: string;
    statusIndicator: {
      text: string;
      active: boolean;
    };
    rotatingCategories: string[];
    bioParagraphs: string[];
    timeline: {
      stage: string;
      title: string;
      description: string;
    }[];
  };
  sections: {
    hero: boolean;
    about: boolean;
    capabilities: boolean;
    skills: boolean;
    projects: boolean;
    experiments: boolean;
    buildLog: boolean;
    contact: boolean;
  };
  capabilities: CapabilityItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  experiments: ExperimentItem[];
  buildLog: BuildLogEntry[];
  socialLinks: SocialLink[];
  privacyPolicy: {
    lastUpdated: string;
    dataCollection: string;
    analyticsStatus: string;
    cookiesStatus: string;
    contactStorageStatus: string;
  };
}

export const initialSiteConfig: SiteConfig = {
  owner: {
    name: "JAYANT",
    location: "India",
    roleTagline: "Class 12 Student & Digital Builder",
    headline: "HI, I'M JAYANT",
    subheading: "A CLASS 12 STUDENT EXPLORING TECHNOLOGY, BUSINESS, AI, CONTENT CREATION AND DIGITAL PRODUCTS ⚡",
    statusIndicator: {
      text: "Exploring automated video editing & web tools",
      active: true
    },
    rotatingCategories: [
      "Websites",
      "AI Tools",
      "Automation",
      "YouTube Systems",
      "Digital Products",
      "3D Renders"
    ],
    bioParagraphs: [
      "I'm a Class 12 high school student based in India passionate about software development, artificial intelligence, content automation, and digital entrepreneurship.",
      "Instead of relying purely on theoretical concepts, I learn by building actual hands-on projects: web applications, AI script pipelines, 3D Blender assets, and online content systems.",
      "This site serves as a transparent portfolio and build log documenting my progress as a young builder."
    ],
    timeline: [
      {
        stage: "Learning",
        title: "Foundations & Curiosity",
        description: "Studying high school academics while mastering HTML/CSS/JS, Python, Blender 3D, and video editing tools."
      },
      {
        stage: "Experimenting",
        title: "Testing Ideas & Automation",
        description: "Testing AI-assisted dev workflows, local LLM caption generators, faceless video pipelines, and web utilities."
      },
      {
        stage: "Building",
        title: "Real Projects & Products",
        description: "Building responsive web tools, media ranking apps, and content creation pipelines."
      },
      {
        stage: "Improving",
        title: "Iterating & Refining",
        description: "Gathering feedback, optimizing web performance, and refining user experiences."
      }
    ]
  },
  sections: {
    hero: true,
    about: true,
    capabilities: true,
    skills: true,
    projects: true,
    experiments: true,
    buildLog: true,
    contact: true
  },
  capabilities: [
    {
      id: 'cap-1',
      number: '01',
      title: 'WEB DEVELOPMENT',
      description: 'Building fast, responsive web applications and interactive landing pages using modern frontend tools like React, TypeScript, and Tailwind CSS.',
      tags: ['React', 'TypeScript', 'Tailwind', 'HTML5', 'Vite'],
      enabled: true
    },
    {
      id: 'cap-2',
      number: '02',
      title: 'VIDEO EDITING & AUTOMATION',
      description: 'Designing faceless video workflows, automated transcript subtitles with Whisper, ffmpeg rendering scripts, and content editing systems.',
      tags: ['Python', 'ffmpeg', 'Whisper AI', 'Premiere Pro', 'After Effects'],
      enabled: true
    },
    {
      id: 'cap-3',
      number: '03',
      title: '3D ART & BLENDER',
      description: 'Creating 3D object renders, procedural materials, lighting setups, and camera animations in Blender for digital UI visuals.',
      tags: ['Blender 3D', 'Cycles Engine', 'Shader Nodes', 'Visual Design'],
      enabled: true
    },
    {
      id: 'cap-4',
      number: '04',
      title: 'AI TOOLS & WORKFLOWS',
      description: 'Leveraging AI-assisted development, prompt engineering, local model integrations, and workflow automation for maximum builder velocity.',
      tags: ['AI Tools', 'Prompt Dev', 'Workflow Automation', 'CLI'],
      enabled: true
    },
    {
      id: 'cap-5',
      number: '05',
      title: 'DIGITAL PRODUCTS & EXPERIMENTS',
      description: 'Developing micro web utilities, notion productivity templates, and exploring online income streams and digital entrepreneurship.',
      tags: ['Digital Products', 'Content Systems', 'Online Income', 'Growth'],
      enabled: true
    }
  ],
  skills: [
    // Development
    { id: 'dev-1', name: 'HTML5 & CSS3', category: 'Development', level: 'Building', iconName: 'Code2', enabled: true },
    { id: 'dev-2', name: 'JavaScript (ES6+)', category: 'Development', level: 'Building', iconName: 'FileCode', enabled: true },
    { id: 'dev-3', name: 'React', category: 'Development', level: 'Practicing', iconName: 'Atom', enabled: true },
    { id: 'dev-4', name: 'Next.js', category: 'Development', level: 'Learning', iconName: 'Globe', enabled: true },
    { id: 'dev-5', name: 'Python', category: 'Development', level: 'Practicing', iconName: 'Terminal', enabled: true },
    { id: 'dev-6', name: 'C++', category: 'Development', level: 'Learning', iconName: 'Cpu', enabled: true },
    
    // Creative
    { id: 'crt-1', name: 'Blender 3D', category: 'Creative', level: 'Practicing', iconName: 'Box', enabled: true },
    { id: 'crt-2', name: 'Video Editing', category: 'Creative', level: 'Building', iconName: 'Video', enabled: true },
    { id: 'crt-3', name: 'After Effects', category: 'Creative', level: 'Learning', iconName: 'Sparkles', enabled: true },
    { id: 'crt-4', name: 'Premiere Pro', category: 'Creative', level: 'Practicing', iconName: 'Film', enabled: true },
    { id: 'crt-5', name: 'Visual Design', category: 'Creative', level: 'Practicing', iconName: 'Palette', enabled: true },

    // AI & Automation
    { id: 'ai-1', name: 'AI Tool Workflows', category: 'AI / Automation', level: 'Building', iconName: 'Bot', enabled: true },
    { id: 'ai-2', name: 'AI-Assisted Dev', category: 'AI / Automation', level: 'Building', iconName: 'Wand2', enabled: true },
    { id: 'ai-3', name: 'Workflow Automation', category: 'AI / Automation', level: 'Practicing', iconName: 'Zap', enabled: true },
    { id: 'ai-4', name: 'Content Automation', category: 'AI / Automation', level: 'Learning', iconName: 'Layers', enabled: true },

    // Business
    { id: 'biz-1', name: 'Digital Products', category: 'Business', level: 'Practicing', iconName: 'ShoppingBag', enabled: true },
    { id: 'biz-2', name: 'YouTube Content Systems', category: 'Business', level: 'Building', iconName: 'PlaySquare', enabled: true },
    { id: 'biz-3', name: 'Affiliate Marketing', category: 'Business', level: 'Learning', iconName: 'TrendingUp', enabled: true },
    { id: 'biz-4', name: 'Online Income Systems', category: 'Business', level: 'Learning', iconName: 'DollarSign', enabled: true }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Local Ranking Video Editor',
      tagline: 'Browser-based video comparison & ranking web application',
      description: 'A responsive web tool allowing content creators to load local video files, perform pairwise comparisons, rank video clips, and export ordered playlists without server uploads.',
      category: 'Web Projects',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5 Media API'],
      status: 'Building',
      whatILearned: 'Learned browser state management for drag-and-drop media cards, local storage caching, Blob URLs, and responsive dark UI design.',
      githubUrl: 'https://github.com/example/ranking-video-editor',
      liveUrl: 'https://example-ranking-video.vercel.app',
      demoBadge: 'Local Application',
      approved: true
    },
    {
      id: 'proj-2',
      name: 'Faceless Content Automation Pipeline',
      tagline: 'Python script for transcript generation & video assembly',
      description: 'An experimental automation script that takes audio clips, generates timestamped captions using local AI models, and formats video renders using ffmpeg commands.',
      category: 'YouTube Systems',
      techStack: ['Python', 'ffmpeg', 'Whisper AI', 'CLI'],
      status: 'Prototype',
      whatILearned: 'Learned CLI argument parsing, subprocess management in Python, subtitle file formats (.srt/.vtt), and media rendering optimization.',
      githubUrl: 'https://github.com/example/faceless-content-pipeline',
      approved: true
    },
    {
      id: 'proj-3',
      name: 'Student Builder Resource Hub',
      tagline: 'Curated directory of free tools & developer kits',
      description: 'A clean, minimal website indexing free tiers for developers, open-source AI models, Blender tutorials, and productivity templates.',
      category: 'Digital Products',
      techStack: ['HTML', 'CSS', 'JavaScript', 'Vite'],
      status: 'Live',
      whatILearned: 'Learned structured JSON data filtering, quick search indexing, web performance tuning, and accessible keyboard navigation.',
      liveUrl: 'https://example-hub.vercel.app',
      approved: true
    },
    {
      id: 'proj-4',
      name: '3D Product Rendering Experiments',
      tagline: 'Blender scene library for tech device renders',
      description: 'A collection of custom lighting setups, procedural glass shaders, and camera animations for rendering digital product concepts in Blender.',
      category: 'Experiments',
      techStack: ['Blender 3D', 'Cycles Engine', 'Shader Nodes'],
      status: 'Prototype',
      whatILearned: 'Learned procedural node textures, camera focal length framing, HDR environmental lighting, and render passes.',
      approved: true
    }
  ],
  experiments: [
    {
      id: 'exp-1',
      title: 'Automated Script-to-Video Workflows',
      category: 'YouTube & Content',
      description: 'Testing how far local open-source models (like Whisper and Ollama) can automate rough script generation and automated caption alignment.',
      learnings: 'Local models are fast for transcription but still require human oversight for storytelling flow and pacing.',
      status: 'Active Exploration',
      enabled: true
    },
    {
      id: 'exp-2',
      title: 'Micro Digital Products & Templates',
      category: 'Entrepreneurship',
      description: 'Designing lightweight Notion templates and starter web layouts to test interest in micro digital product downloads.',
      learnings: 'Simplicity and solving a very specific problem beats complex multi-feature products.',
      status: 'Testing',
      enabled: true
    },
    {
      id: 'exp-3',
      title: 'Blender Procedural Textures for UI Assets',
      category: 'Creative Tech',
      description: 'Creating procedural dark glass and metallic shader materials in Blender to export crisp UI icon assets.',
      learnings: 'Understanding light roughness and normal maps improves digital visual design skills.',
      status: 'Researching',
      enabled: true
    }
  ],
  buildLog: [
    {
      id: 'log-1',
      date: 'September 2026',
      title: 'Redesigned Portfolio to 3D High-Contrast Video Aesthetic',
      summary: 'Rebuilt portfolio interface featuring 3D avatar head visual, giant stroke typography, high contrast capability cards, and permission-first architecture.',
      tags: ['React', 'TypeScript', '3D Design', 'Privacy'],
      approved: true
    },
    {
      id: 'log-2',
      date: 'September 2026',
      title: 'Explored Video Comparison Tool Architecture',
      summary: 'Researched local HTML5 video playback and state persistence for comparing multiple clip cuts directly in the browser.',
      tags: ['Video Editing', 'JavaScript', 'HTML5 Media'],
      approved: true
    },
    {
      id: 'log-3',
      date: 'August 2026',
      title: 'Automated Caption Alignment with Python',
      summary: 'Wrote Python scripts integrating Whisper model output to produce styled subtitle overlays via ffmpeg.',
      tags: ['Python', 'AI Tools', 'ffmpeg', 'Automation'],
      approved: true
    }
  ],
  socialLinks: [
    { id: 'soc-1', platform: 'GitHub', url: 'https://github.com', iconName: 'Github', enabled: true },
    { id: 'soc-2', platform: 'YouTube', url: 'https://youtube.com', iconName: 'Youtube', enabled: true },
    { id: 'soc-3', platform: 'LinkedIn', url: 'https://linkedin.com', iconName: 'Linkedin', enabled: true },
    { id: 'soc-4', platform: 'Email', url: 'mailto:jayant.builder@example.com', iconName: 'Mail', enabled: true }
  ],
  privacyPolicy: {
    lastUpdated: "September 20, 2026",
    dataCollection: "Zero automatic data collection. No hidden tracking pixels, fingerprinting, or silent IP logging.",
    analyticsStatus: "Disabled by default. No analytics scripts are loaded or executed.",
    cookiesStatus: "No tracking or advertising cookies used. Technically necessary local storage is used solely to store your site permission preferences.",
    contactStorageStatus: "Contact form operates in explicit permission preview mode. No messages are dispatched or stored without user confirmation."
  }
};
