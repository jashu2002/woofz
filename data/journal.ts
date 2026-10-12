export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  excerpt: string;
  content: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: "calmer-home",
    slug: "designing-a-calmer-home-with-a-dog",
    title: "Designing a calmer home with a dog",
    subtitle: "Harmonizing canine spatial needs with contemporary interior minimalism.",
    category: "INTERIOR PHILOSOPHY",
    date: "October 14, 2026",
    readTime: "4 min read",
    author: "Elena Lindqvist",
    image: "/images/journal/journal_1.jpg",
    excerpt:
      "Modern interior design often views pet accessories as visual compromises. Here is how thoughtful tactile materials and subtle spatial integration transform pet furniture into architectural assets.",
    content: [
      "For decades, the design world operated under an unspoken assumption: pet ownership required a visual compromise. Synthetic fabrics, neon accents, and flimsy foam cushions disrupted carefully curated living rooms.",
      "At WOofe, our studio started with a simple question: What if pet furniture was held to the exact same architectural standards as your lounge chairs, dining tables, and stoneware?",
      "By selecting natural linen, bouclé wool weaves, and warm ivory tones that catch morning sunlight, a dog bed stops feeling like an object to hide in the corner and becomes a permanent sanctuary of warmth.",
    ],
  },
  {
    id: "how-dogs-choose-sleep",
    slug: "how-dogs-choose-where-to-sleep",
    title: "How dogs choose where to sleep",
    subtitle: "Understanding thermal comfort, scent nesting, and denning instincts.",
    category: "CANINE BEHAVIOR",
    date: "September 28, 2026",
    readTime: "6 min read",
    author: "Dr. Marcus Thorne",
    image: "/images/journal/journal_2.jpg",
    excerpt:
      "From thermal dissipation to sightline orientation, understanding your dog’s natural nesting behavior is key to positioning their resting space.",
    content: [
      "Dogs do not pick their sleeping locations at random. Their internal instincts evaluate ambient room temperature, draft lines, family proximity, and perimeter vision before settling down.",
      "A curved bolster wall mimics the protective enclosure of natural dens, allowing dogs to relax their sympathetic nervous system and achieve deeper, restorative REM sleep cycles.",
      "Positioning your dog's bed in a low-traffic corner with clear sightlines to the main living area satisfies their social instincts without exposing them to constant physical disturbance.",
    ],
  },
  {
    id: "making-of-premium-bed",
    slug: "inside-the-making-of-a-premium-dog-bed",
    title: "Inside the making of a premium dog bed",
    subtitle: "From Scandinavian loom mills to hand-stitched leather detailing.",
    category: "CRAFTSMANSHIP",
    date: "August 18, 2026",
    readTime: "5 min read",
    author: "Henrik Vane",
    image: "/images/journal/journal_3.jpg",
    excerpt:
      "A rare look inside our Copenhagen textile studio: testing bouclé claw resistance, sourcing CertiPUR foam, and refining saddle-stitch seams.",
    content: [
      "Creating fabric that resists daily claws while maintaining the soft hand-feel of high-fashion upholstery requires years of material iteration. Our bouclé blend undergoes 50,000 double-rub abrasion tests.",
      "Underneath the exterior fabric lies a dual-core foam structure: high-density load-bearing base foam topped with viscoelastic gel memory foam that responds to your dog's body heat.",
      "Every seam is double-stitched with bonded nylon thread, ensuring your investment retains its architectural form after years of heavy use and repeated washings.",
    ],
  },
];
