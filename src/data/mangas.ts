// This is your new centralized data file.
// It makes managing your manga collection much easier.

export type Manga = {
  id: number;
  title: string;
  author: string;
  img: string;
  description: string;
  price: number;
  category: string;
};

export const allMangas: Manga[] = [
  { id: 1, title: "Naruto", author: "Masashi Kishimoto", img: "https://placehold.co/400x600/F97316/FFFFFF?text=Naruto", description: "A young ninja seeks recognition and dreams of becoming the strongest.", price: 299, category: "Shonen" },
  { id: 2, title: "One Piece", author: "Eiichiro Oda", img: "https://placehold.co/400x600/3B82F6/FFFFFF?text=One+Piece", description: "A pirate crew searches for the ultimate treasure, the 'One Piece'.", price: 399, category: "Shonen" },
  { id: 3, title: "Sailor Moon", author: "Naoko Takeuchi", img: "https://placehold.co/400x600/EC4899/FFFFFF?text=Sailor+Moon", description: "A magical girl fights evil by moonlight and wins love by daylight.", price: 349, category: "Shojo" },
  { id: 4, title: "Attack on Titan", author: "Hajime Isayama", img: "https://placehold.co/400x600/78716C/FFFFFF?text=AOT", description: "Humanity fights for survival against giant man-eating Titans.", price: 349, category: "Seinen" },
  { id: 5, title: "Demon Slayer", author: "Koyoharu Gotouge", img: "https://placehold.co/400x600/14B8A6/FFFFFF?text=Demon+Slayer", description: "A boy's quest to become a demon slayer after his family is slaughtered.", price: 279, category: "Shonen" },
  { id: 6, title: "Fruits Basket", author: "Natsuki Takaya", img: "https://placehold.co/400x600/F472B6/FFFFFF?text=Fruits+Basket", description: "An orphan girl helps a family cursed to turn into zodiac animals.", price: 199, category: "Shojo" },
  { id: 7, title: "Berserk", author: "Kentaro Miura", img: "https://placehold.co/400x600/4B5563/FFFFFF?text=Berserk", description: "A lone mercenary navigates a dark medieval world of demons and monsters.", price: 449, category: "Seinen" },
  { id: 8, title: "Kimi ni Todoke", author: "Karuho Shiina", img: "https://placehold.co/400x600/FB7185/FFFFFF?text=Kimi+ni+Todoke", description: "A sweet, misunderstood high school girl begins to make friends.", price: 249, category: "Shojo" },
  { id: 9, title: "Jujutsu Kaisen", author: "Gege Akutami", img: "https://placehold.co/400x600/8B5CF6/FFFFFF?text=JJK", description: "A high school student joins a secret society of Jujutsu Sorcerers.", price: 319, category: "Shonen" },
  { id: 10, title: "Vinland Saga", author: "Makoto Yukimura", img: "https://placehold.co/400x600/CA8A04/FFFFFF?text=Vinland+Saga", description: "The epic tale of Vikings, exploring a boy's journey to find purpose.", price: 499, category: "Seinen" },
];
