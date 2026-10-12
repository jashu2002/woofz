export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  dog: string;
  product: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "For the first time, our living room feels complete. The Bear Bed isn't just pet furniture — it is a piece of quiet Scandinavian sculpture that our dog refuses to leave.",
    author: "Concept customer story",
    location: "Stockholm",
    dog: "Vizsla",
    product: "The Bear Bed",
  },
  {
    id: "2",
    quote:
      "As an interior architect, I wanted a dog bed that coexisted with modern furniture. WOofe solved a spatial problem with real design intent.",
    author: "Concept customer story",
    location: "Milan",
    dog: "Italian Greyhound",
    product: "The Arch Nest",
  },
  {
    id: "3",
    quote:
      "The tactile quality of the bouclé wool and orthopedic support exceeded expectations. It feels as natural in our living room as our designer lounge sofa.",
    author: "Concept customer story",
    location: "Amsterdam",
    dog: "Golden Retriever",
    product: "The Studio Cushion",
  },
];
