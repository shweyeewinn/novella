export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Books" },
  { href: "/categories", label: "Categories" },
  { href: "/authors", label: "Authors" },
  { href: "/blog", label: "Blog" },
] as const;

export const footerSections = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All books" },
      { href: "/categories", label: "Categories" },
      { href: "/authors", label: "Authors" },
      { href: "/wishlist", label: "Wishlist" },
    ],
  },
  {
    title: "Discover",
    links: [
      { href: "/", label: "Home" },
      { href: "/blog", label: "Blog" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Log in" },
      { href: "/signup", label: "Sign up" },
      { href: "/account", label: "My account" },
    ],
  },
] as const;
