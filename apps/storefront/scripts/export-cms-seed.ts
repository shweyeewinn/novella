import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import { preOrderBooks } from "../src/features/books/preOrderBooks";
import { newReleaseBooks } from "../src/features/books/newReleaseBooks";
import { mockPosts } from "../src/features/blog/mockPosts";
import { browseCategories } from "../src/features/catalog/browseCategories";
import { site } from "../src/config/site";

const outDir = path.join(__dirname, "../../strapi/database/seed");

mkdirSync(outDir, { recursive: true });

const books = [...preOrderBooks, ...newReleaseBooks].filter((b) =>
  Boolean(b.coverImageSrc?.trim())
);

writeFileSync(path.join(outDir, "books.json"), JSON.stringify(books, null, 2));
writeFileSync(path.join(outDir, "blog-posts.json"), JSON.stringify(mockPosts, null, 2));
writeFileSync(
  path.join(outDir, "browse-categories.json"),
  JSON.stringify(browseCategories, null, 2)
);
writeFileSync(
  path.join(outDir, "site-setting.json"),
  JSON.stringify(
    {
      siteName: site.name,
      tagline: site.tagline,
      ownerName: site.owner.name,
      ownerEmail: site.owner.email,
      bankName: site.payment.bankName,
      accountName: site.payment.accountName,
      accountNumber: site.payment.accountNumber,
      transferNote: site.payment.transferNote ?? "",
    },
    null,
    2
  )
);

console.log(`Wrote ${books.length} books, ${mockPosts.length} posts to ${outDir}`);
