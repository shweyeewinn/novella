/**
 * Site-wide identity — owner contact, branding, and support email.
 * Used in footer, transactional email templates, and metadata.
 */
export const site = {
  name: "Novella",
  faviconSrc: "/favicon-32.png",
  tagline: "An online bookstore for physical books",
  owner: {
    name: "Shwe Yee Winn",
    email: "yonngelay@gmail.com",
  },
  /** Bank transfer shown on checkout success — update with your live details */
  payment: {
    bankName: "Myanmar Post Bank",
    accountName: "Shwe Yee Winn",
    accountNumber: "0000-0000-0000-0000",
    transferNote: "Use your order number as the payment reference when possible.",
  },
  /** Facebook Page for payment proof via Messenger */
  facebook: {
    pageName: "Revella",
    /** m.me link or Messenger URL to your Page */
    messengerUrl: "https://m.me/your-revella-page",
  },
} as const;
