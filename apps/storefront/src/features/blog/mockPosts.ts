import type { BlogPost } from "./types";

export const mockPosts: BlogPost[] = [
  {
    slug: "why-we-chose-cream-not-white",
    title: "Why we chose cream paper, not stark white",
    excerpt:
      "Calm backgrounds reduce glare for long reading sessions—and they feel closer to a real page under lamplight.",
    category: "reading",
    author: "Shwe Yee Winn",
    publishedAt: "2026-05-12",
    readingMinutes: 4,
    featured: true,
    coverHue: 42,
    body: `Bookshops should feel like rooms you want to stay in. Pure white screens shout; cream tones whisper.

We designed Novella for people who read descriptions, compare editions, and return later to finish a chapter. That means comfortable contrast, serif headlines, and sans-serif UI text that stays out of the way.

If you are building a reader-first store, start with typography and whitespace before animations. The books are already beautiful—your job is to frame them.`,
  },
  {
    slug: "digital-and-physical-on-one-shelf",
    title: "Digital and physical books on one shelf",
    excerpt:
      "One catalog, two fulfillment paths: inventory for print, secure links for ebooks after payment.",
    category: "publishing",
    author: "Shwe Yee Winn",
    publishedAt: "2026-05-02",
    readingMinutes: 6,
    coverHue: 215,
    body: `Readers do not think in “channels.” They think in titles. Novella lists physical and digital editions together, then fulfills each format safely on the server after checkout.

Physical copies decrement stock when payment clears. Digital copies never sit in a public folder—buyers receive time-limited download links by email. The cart only ever sends book IDs and quantities; prices are always calculated on the backend.`,
  },
  {
    slug: "five-minutes-with-elena-marsh",
    title: "Five minutes with Elena Marsh",
    excerpt:
      "The author of The Night Library on night walks, unfinished stories, and the books she re-reads every year.",
    category: "authors",
    author: "Editorial",
    publishedAt: "2026-04-18",
    readingMinutes: 5,
    coverHue: 18,
    body: `“I write after the city gets quiet,” Elena Marsh says. “Not because the world is more magical then—but because I can hear sentences better.”

Her novel began as notes on index cards tucked into library books she returned. She still keeps one card in her wallet: a line she has not placed in a story yet.

When we asked which books she gifts most often, she laughed. “Short novels. Long train rides. People underestimate how far a slim book can travel.”`,
  },
  {
    slug: "starting-a-neighborhood-book-club",
    title: "Starting a neighborhood book club that actually meets",
    excerpt:
      "Small groups, clear dates, and one rule: the host picks a book under 300 pages.",
    category: "community",
    author: "Novella Editorial",
    publishedAt: "2026-03-28",
    readingMinutes: 7,
    coverHue: 155,
    body: `The best clubs are boring on purpose. Same day each month. Same length. Tea or coffee, not a full dinner.

Pick one book that fits a single evening of conversation. Send the title three weeks ahead. Keep notes optional—questions on an index card are enough.

Novella readers often mix print and digital; choose editions early so everyone is on the same page—literally.`,
  },
  {
    slug: "a-conversation-with-u-htin-min",
    title: "A conversation with U Htin Min on writing in two languages",
    excerpt:
      "The historian and essayist on choosing Burmese for memory and English for argument—and the books that shaped both.",
    category: "authors",
    author: "Editorial",
    publishedAt: "2026-05-08",
    readingMinutes: 6,
    coverHue: 24,
    body: `U Htin Min keeps two notebooks on his desk: one for drafts in Burmese, one for outlines in English. “They are not translations of each other,” he says. “They are two ways of thinking about the same century.”

His latest collection weaves family letters with public archives. He reads aloud when he edits—always in the language the passage was written in.

Asked what he hopes readers feel, he pauses. “Recognition first. Argument second. The shelf should feel like a room where disagreement is allowed.”`,
  },
  {
    slug: "debut-authors-we-are-watching",
    title: "Six debut authors we are watching this season",
    excerpt:
      "First novels and essay collections arriving on the shop—voices from Yangon, Mandalay, and the diaspora.",
    category: "authors",
    author: "Novella Editorial",
    publishedAt: "2026-04-02",
    readingMinutes: 5,
    coverHue: 8,
    body: `Debuts carry a particular electricity: the sense that a reader is meeting a sensibility for the first time. This season we are paying attention to six writers whose work spans literary fiction, history, and quiet memoir.

Several began in small magazines; two self-published chapbooks before finding a publisher. What they share is patience—books built sentence by sentence, not trend by trend.

We will introduce each title on the shop as stock arrives. If you run a club, consider pairing a debut with an established author in the same genre for contrast.`,
  },
  {
    slug: "the-art-of-the-author-note",
    title: "The art of the author note (and why we read them)",
    excerpt:
      "A good note is not a summary—it is a handshake before the first chapter.",
    category: "authors",
    author: "Shwe Yee Winn",
    publishedAt: "2026-03-10",
    readingMinutes: 4,
    coverHue: 32,
    body: `Author notes are easy to skip. They are also where many writers tell the truth about what the book cost them—time, research, doubt.

We encourage short, plain notes on the Novella shop: where the book was written, who helped, what the reader might listen for. No spoilers. No marketing fog.

Readers tell us they trust a book more when the note sounds like a person, not a press release. Writers tell us the note is the last edit. Both are right.`,
  },
  {
    slug: "how-we-price-a-paperback",
    title: "How we price a paperback fairly",
    excerpt:
      "Printing costs, author share, and why the sticker on the shelf should make sense to a reader.",
    category: "publishing",
    author: "Shwe Yee Winn",
    publishedAt: "2026-04-25",
    readingMinutes: 5,
    coverHue: 210,
    body: `Pricing is the least romantic part of publishing—and the part readers notice first. For Novella, a paperback price starts with the printer’s quote, freight, and a margin that keeps the shop sustainable.

We round to readable numbers. We avoid fake “was/now” games. When a title is on promotion, the reason is stated: clearance, bundle, or launch.

Authors deserve clarity too: what share applies, when it is paid, how returns work. A fair shop publishes those answers in plain language, not footnotes.`,
  },
  {
    slug: "jacket-design-in-three-revisions",
    title: "Jacket design in three revisions",
    excerpt:
      "From rough concept to printed wrap—what changes when a cover meets real books on a table.",
    category: "publishing",
    author: "Novella Editorial",
    publishedAt: "2026-04-08",
    readingMinutes: 5,
    coverHue: 228,
    body: `A cover begins as mood: a color, a typeface, a single image. By the third revision it must survive a phone screen, a shop table, and a reader’s peripheral vision from three meters away.

We test covers small. We ask: can you read the title without squinting? Does the spine compete or cooperate on a shelf?

The best jackets we have shipped are not the loudest—they are the most legible. Publishing is persuasion, but legibility is kindness.`,
  },
  {
    slug: "reprints-and-second-editions",
    title: "When a book earns a reprint",
    excerpt:
      "Corrections, new forewords, and the quiet celebration of a title that sold through.",
    category: "publishing",
    author: "Editorial",
    publishedAt: "2026-03-18",
    readingMinutes: 4,
    coverHue: 205,
    body: `A reprint is a small vote of confidence. The printer runs again; the warehouse breathes out. Sometimes the author adds a foreword—what changed since the first run, what readers taught them.

Second editions may fix typos discovered by careful readers. We note corrections on the copyright page so collectors know which printing they hold.

If you missed a title the first time, reprints are your second chance. We list them like new arrivals because, for many readers, they are.`,
  },
  {
    slug: "reading-with-strangers",
    title: "Reading with strangers: open shelves in public spaces",
    excerpt:
      "Little free libraries, shop windows, and the etiquette of leaving a book you loved.",
    category: "community",
    author: "Novella Editorial",
    publishedAt: "2026-05-05",
    readingMinutes: 5,
    coverHue: 148,
    body: `Community reading does not require a building. A crate by a tea shop, a window ledge with three paperbacks, a labeled shelf in a hostel—each is an invitation.

Leave books you would recommend, not books you want to discard. A sticky note with one sentence—“I cried on page 90”—counts as a review.

We photograph shelves readers send us (with permission) and share them here. The goal is simple: make reading visible in the neighborhood.`,
  },
  {
    slug: "pairing-tea-with-genre",
    title: "Pairing tea with genre (a completely unscientific guide)",
    excerpt:
      "Earl grey for mysteries, strong laphet yay for history—reader rituals we collected from customers.",
    category: "community",
    author: "Shwe Yee Winn",
    publishedAt: "2026-04-12",
    readingMinutes: 4,
    coverHue: 138,
    body: `Readers wrote to us with pairing rules. Crime fiction and ginger tea. Poetry and something floral. Thick history and a pot that stays hot for an hour.

None of this affects plot. All of it affects mood. Rituals turn reading from a task into a place you return to.

We published the list as a joke, then realized it was a map of how people protect reading time. Your pairing may differ. Tell us—we will add it.`,
  },
  {
    slug: "donating-books-responsibly",
    title: "Donating books responsibly",
    excerpt:
      "Schools, monasteries, and community libraries—questions to ask before you drop off a box.",
    category: "community",
    author: "Editorial",
    publishedAt: "2026-02-20",
    readingMinutes: 6,
    coverHue: 162,
    body: `A donation is not a clearance sale for your shelf. Call ahead. Ask what ages, languages, and subjects they need this month. Moldy or missing covers rarely help.

Box by category. List titles on a sheet inside the lid. Include contact info if you are willing to answer questions.

Novella customers often donate after a big read-through. We maintain a short list of partner organizations on the contact page—updated quarterly when needs change.`,
  },
  {
    slug: "slow-reading-sunday",
    title: "Slow Reading Sunday: one chapter, no screens",
    excerpt:
      "A reader-led habit spreading through clubs—thirty minutes, one bookmark, phones in another room.",
    category: "reading",
    author: "Novella Editorial",
    publishedAt: "2026-04-30",
    readingMinutes: 3,
    coverHue: 48,
    body: `Slow Reading Sunday is not a challenge. There is no leaderboard. You read one chapter without switching apps, then stop—even if the cliffhanger screams.

Clubs report fewer abandoned books. Families report fewer arguments about “just one more video.” The point is presence, not volume.

Try it once. If you like it, make it monthly. The shop will keep the lights low on Sundays in spirit, if not in fact.`,
  },
];
