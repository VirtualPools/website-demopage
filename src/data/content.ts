/**
 * Copy and structured content pulled from the live virtualpools.io/demo (Dorik)
 * pages. Images are downloaded locally under public/images/ rather than linking
 * back to the original Dorik CDN.
 */

export const LOGO_WHITE_URL = "/images/logo/VirtualPoolsLogoWhite.svg";

export const HERO_CONTENT = {
  heading: "We'll build your own, unique pool configurator.",
  subheading:
    "Get a personalized product demo and have all your questions answered by one of our founders. No sales teams and no obligations.",
  valueProps: [
    "Learn how to increase your swimming pool sales.",
    "Convince your clients faster and close more projects.",
    "Attract more qualified pool leads and customers.",
  ],
};

export interface ClientLogo {
  name: string;
  src: string;
}

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "Renolit", src: "/images/clients/Renolit.webp" },
  { name: "Haogenplast", src: "/images/clients/Haogenplast.webp" },
  { name: "Compass Pools", src: "/images/clients/CompassPools.webp" },
  { name: "TA", src: "/images/clients/TA.webp" },
  { name: "Fluvo", src: "/images/clients/Fluvo.webp" },
  { name: "LPW Pools", src: "/images/clients/LPWPools.webp" },
  { name: "Duratech", src: "/images/clients/Duratech.webp" },
  { name: "Scandiroc", src: "/images/clients/Scandiroc.webp" },
  { name: "Bluedrops", src: "/images/clients/Bluedrops.webp" },
  { name: "Binder24", src: "/images/clients/Binder24.webp" },
];

// youtube-nocookie video IDs, taken from the embeds on the live page.
export const VIDEO_TESTIMONIALS = [
  { id: "q9zbvZL9pnI", title: "VirtualPools customer testimonial 1" },
  { id: "l7lLSTYJVYk", title: "VirtualPools customer testimonial 2" },
  { id: "5w1HWtd2PWU", title: "VirtualPools customer testimonial 3" },
];

export interface FeatureBlock {
  heading: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
}

// Locally hosted placeholders (public/images/features/) — swap these files for the
// real product screenshots when they're ready; content.ts won't need to change.
export const FEATURE_BLOCKS: FeatureBlock[] = [
  {
    heading: "We build your custom 3D pool configurator",
    body: "We do not hand you a generic tool and leave you to figure it out. After the demo, we build a custom 3D pool configurator tailored to your company, your product range, and your sales process. From pool shapes and finishes to covers, stairs, terraces, lighting, and more.",
    imageSrc: "/images/features/3d-pool-configurator.webp",
    imageAlt: "VirtualPools 3D pool configurator dashboard",
  },
  {
    heading:
      "You place and visualize 3D pool designs in your customer's garden",
    body: "When all set up, your custom pool configurator becomes a powerful sales tool for presenting projects in 3D. Design pools directly in your client’s backyard, adjust every key detail in real time, and show how the final result fits the terrain. This means fewer revisions and faster approvals!",
    imageSrc: "/images/features/garden-visualization.webp",
    imageAlt:
      "VirtualPools mobile app placing a 3D pool design in a real garden",
  },
  {
    heading:
      "The Lead Generator works in the background, attracting more leads",
    body: "Capture more qualified pool leads directly from your website with the AI-powered pool Lead Generator. Your visitors can generate their future pool visualizations in their own garden, while you collect their email address. VirtualPools helps pool contractors turn online traffic into real pool projects faster.",
    imageSrc: "/images/features/lead-generator-widget.webp",
    imageAlt: "VirtualPools AI-powered Lead Generator widget",
  },
];

export interface TextTestimonial {
  quote: string;
  company: string;
  logoSrc: string;
}

export const TEXT_TESTIMONIALS: TextTestimonial[] = [
  {
    quote:
      "I'm a pool installer. I use VirtualPools to present all my quotes and I've already sold two extra pools in just a few weeks thanks to VirtualPools. It's a perfect application, and I recommend that everyone gives it a try.",
    company: "Piscine Services",
    logoSrc: `/images/brandlogo/PiscineServices.webp`,
  },
  {
    quote:
      "Customers are immediately convinced when they see the pool we designed together in their own garden. I've seen a big increase in sales. A quality product!",
    company: "ACZwembaden",
    logoSrc: `/images/brandlogo/ACZwembaden.webp`,
  },
  {
    quote:
      "You can closely check the pool with your customer. You can let them see the stairs, colors, the lights, or you can completely close the roll cover. You can really do anything in this application.",
    company: "PW",
    logoSrc: `/images/brandlogo/PlatinumWellness.webp`,
  },
];

export const CTA_BAND = {
  heading: "Ready to simplify how you sell pools?",
  body: "Talk to us about your business. After the demo, we will tailor VirtualPools to your sales process, giving you a custom pool configurator designed to help you generate leads, improve client presentations, and close deals faster.",
  buttonLabel: "Talk to us",
};

export const FAQ_ITEMS = [
  {
    question: "What is VirtualPools?",
    answer:
      "VirtualPools is a custom 3D pool configurator platform built specifically for pool construction businesses. After the demo call, we build a tailored configurator for your company, combining a lead generation plugin for your website, a project dashboard, and a mobile app for designing and presenting swimming pools. Together, these tools help you capture more qualified leads, speed up the sales process, and improve how you present pool projects to clients.",
  },
  {
    question: "Is VirtualPools available in my language?",
    answer:
      "VirtualPools is currently available in: English, Dutch, French, German, and Spanish. You can choose your preferred language and measurement settings directly in the platform.",
  },
  {
    question: "What devices will my pool configurator work on?",
    answer:
      "For the best experience, we recommend using modern tablets equipped with powerful processors and sufficient RAM. Devices with up-to-date operating systems and strong graphics performance will ensure smoother navigation, faster loading times, and optimal rendering of 3D content. Choosing a recent model will help you take full advantage of all features without performance limitations.",
  },
];

export const FOOTER_TEXT = "All rights reserved. © 2026 VirtualProducts BV";
