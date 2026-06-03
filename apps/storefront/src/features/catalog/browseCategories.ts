export type BrowseSubcategory = {
  id: string;
  title: string;
  /** Usually /shop?collection={slug} — tag books with the same slug in `collections[]` */
  href: string;
};

/** Main shelf on /categories; `children` are sub-categories shown underneath */
export type BrowseCategory = {
  id: string;
  title: string;
  /** “View all” in the shop for this main category */
  href: string;
  imageSrc?: string;
  hue: number;
  children: BrowseSubcategory[];
};

export const browseCategories: BrowseCategory[] = [
  {
    id: "educational",
    title: "Educational Books",
    href: "/shop?collection=educational",
    imageSrc: "/categories/cat1.webp",
    hue: 38,
    children: [
      {
        id: "educational-study",
        title: "Textbooks & study",
        href: "/shop?collection=educational-study",
      },
      {
        id: "educational-early",
        title: "Early learning",
        href: "/shop?collection=educational-early",
      },
      {
        id: "educational-professional",
        title: "Professional & skills",
        href: "/shop?collection=educational-professional",
      },
    ],
  },
  {
    id: "fiction",
    title: "Fiction",
    href: "/shop?category=fiction",
    imageSrc: "/categories/cat2.webp",
    hue: 220,
    children: [
      { id: "fiction-romance", title: "Romance", href: "/shop?collection=fiction-romance" },
      {
        id: "fiction-mystery",
        title: "Mystery & thriller",
        href: "/shop?collection=fiction-mystery",
      },
      { id: "fiction-scifi", title: "Sci-fi & fantasy", href: "/shop?collection=fiction-scifi" },
      {
        id: "fiction-literary",
        title: "Literary fiction",
        href: "/shop?collection=fiction-literary",
      },
    ],
  },
  {
    id: "biography",
    title: "Biography",
    href: "/shop?collection=biography",
    imageSrc: "/categories/cat3.webp",
    hue: 28,
    children: [
      { id: "biography-memoir", title: "Memoir", href: "/shop?collection=biography-memoir" },
      {
        id: "biography-historical",
        title: "Historical figures",
        href: "/shop?collection=biography-historical",
      },
      {
        id: "biography-contemporary",
        title: "Contemporary lives",
        href: "/shop?collection=biography-contemporary",
      },
    ],
  },
  {
    id: "health",
    title: "Health Books",
    href: "/shop?collection=health",
    imageSrc: "/categories/cat4.webp",
    hue: 145,
    children: [
      { id: "health-general", title: "General health", href: "/shop?collection=health-general" },
      { id: "health-nutrition", title: "Nutrition", href: "/shop?collection=health-nutrition" },
      { id: "health-fitness", title: "Fitness & body", href: "/shop?collection=health-fitness" },
    ],
  },
  {
    id: "mental-health",
    title: "Mental Health and Guidance",
    href: "/shop?collection=mental-health",
    imageSrc: "/categories/cat5.webp",
    hue: 195,
    children: [
      {
        id: "mental-health-self-help",
        title: "Self-help",
        href: "/shop?collection=mental-health-self-help",
      },
      {
        id: "mental-health-psychology",
        title: "Psychology",
        href: "/shop?collection=mental-health-psychology",
      },
      {
        id: "mental-health-wellness",
        title: "Wellness & mindfulness",
        href: "/shop?collection=mental-health-wellness",
      },
    ],
  },
  {
    id: "history-politics",
    title: "History and Politics",
    href: "/shop?collection=history-politics",
    imageSrc: "/categories/cat6.webp",
    hue: 12,
    children: [
      { id: "history-world", title: "World history", href: "/shop?collection=history-world" },
      { id: "history-myanmar", title: "Myanmar history", href: "/shop?collection=history-myanmar" },
      {
        id: "history-politics-current",
        title: "Politics & current affairs",
        href: "/shop?collection=history-politics-current",
      },
    ],
  },
  {
    id: "religion-dharma",
    title: "Religion and Dharma",
    href: "/shop?collection=religion-dharma",
    imageSrc: "/categories/cat7.webp",
    hue: 350,
    children: [
      {
        id: "religion-buddhism",
        title: "Buddhism & dharma",
        href: "/shop?collection=religion-buddhism",
      },
      { id: "religion-faith", title: "Faith & practice", href: "/shop?collection=religion-faith" },
      {
        id: "religion-philosophy",
        title: "Philosophy",
        href: "/shop?collection=religion-philosophy",
      },
    ],
  },
  {
    id: "children",
    title: "Children's Books",
    href: "/shop?collection=children",
    imageSrc: "/categories/cat8.webp",
    hue: 42,
    children: [
      { id: "children-picture", title: "Picture books", href: "/shop?collection=children-picture" },
      { id: "children-middle", title: "Middle grade", href: "/shop?collection=children-middle" },
      { id: "children-ya", title: "Young adult", href: "/shop?collection=children-ya" },
    ],
  },
];
