import fs from 'fs';
import path from 'path';
import type { Core } from '@strapi/strapi';

type SeedBook = {
  id: string;
  slug: string;
  title: string;
  author: string;
  description: string;
  priceCents: number;
  format: 'physical' | 'digital';
  category: string;
  featured?: boolean;
  rating: number;
  reviewCount: number;
  inventoryCount?: number;
  pages?: number;
  isbn?: string;
  publisher?: string;
  publishedYear?: number;
  coverHue: number;
  coverImageSrc?: string;
  collections?: string[];
  preOrder?: boolean;
};

type SeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  author: string;
  publishedAt: string;
  readingMinutes: number;
  featured?: boolean;
  coverHue?: number;
};

type SeedBrowseCategory = {
  id: string;
  title: string;
  href: string;
  imageSrc?: string;
  hue: number;
  children: { id: string; title: string; href: string }[];
};

const SEED_DIR = path.join(process.cwd(), 'database', 'seed');

function readJson<T>(filename: string): T | null {
  const filePath = path.join(SEED_DIR, filename);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
}

async function enablePublicPermissions(strapi: Core.Strapi) {
  const roleService = strapi.plugin('users-permissions').service('role');
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  await roleService.updateRole(publicRole.id, {
    permissions: {
      'api::book': {
        controllers: {
          book: {
            find: { enabled: true },
            findOne: { enabled: true },
          },
        },
      },
      'api::blog-post': {
        controllers: {
          'blog-post': {
            find: { enabled: true },
            findOne: { enabled: true },
          },
        },
      },
      'api::browse-category': {
        controllers: {
          'browse-category': {
            find: { enabled: true },
            findOne: { enabled: true },
          },
        },
      },
      'api::site-setting': {
        controllers: {
          'site-setting': {
            find: { enabled: true },
          },
        },
      },
    },
  });
}

export async function runSeed(strapi: Core.Strapi) {
  await enablePublicPermissions(strapi);

  const books = readJson<SeedBook[]>('books.json');
  const posts = readJson<SeedPost[]>('blog-posts.json');
  const categories = readJson<SeedBrowseCategory[]>('browse-categories.json');
  const siteSetting = readJson<{
    siteName: string;
    tagline: string;
    ownerName: string;
    ownerEmail: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    transferNote?: string;
  }>('site-setting.json');

  const bookCount = await strapi.documents('api::book.book').count({});
  if (books?.length && bookCount === 0) {
    for (const book of books) {
      await strapi.documents('api::book.book').create({
        data: {
          bookId: book.id,
          slug: book.slug,
          title: book.title,
          author: book.author,
          description: book.description,
          priceCents: book.priceCents,
          format: book.format,
          category: book.category as 'fiction' | 'nonfiction' | 'nature' | 'literary',
          featured: book.featured ?? false,
          rating: book.rating,
          reviewCount: book.reviewCount,
          inventoryCount: book.inventoryCount ?? 0,
          pages: book.pages,
          isbn: book.isbn,
          publisher: book.publisher,
          publishedYear: book.publishedYear,
          coverHue: book.coverHue,
          coverImageSrc: book.coverImageSrc ?? '',
          collections: book.collections ?? [],
          preOrder: book.preOrder ?? false,
        },
      });
    }
    strapi.log.info(`Seeded ${books.length} books`);
  }

  const postCount = await strapi.documents('api::blog-post.blog-post').count({});
  if (posts?.length && postCount === 0) {
    for (const post of posts) {
      await strapi.documents('api::blog-post.blog-post').create({
        data: {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          body: post.body,
          category: post.category as 'reading' | 'authors' | 'publishing' | 'community',
          author: post.author,
          publishedAt: post.publishedAt,
          readingMinutes: post.readingMinutes,
          featured: post.featured ?? false,
          coverHue: post.coverHue,
        },
      });
    }
    strapi.log.info(`Seeded ${posts.length} blog posts`);
  }

  const categoryCount = await strapi.documents('api::browse-category.browse-category').count({});
  if (categories?.length && categoryCount === 0) {
    for (let i = 0; i < categories.length; i++) {
      const cat = categories[i];
      await strapi.documents('api::browse-category.browse-category').create({
        data: {
          categoryId: cat.id,
          title: cat.title,
          href: cat.href,
          imageSrc: cat.imageSrc ?? '',
          hue: cat.hue,
          sortOrder: i,
          children: cat.children.map((child) => ({
            childId: child.id,
            title: child.title,
            href: child.href,
          })),
        },
      });
    }
    strapi.log.info(`Seeded ${categories.length} browse categories`);
  }

  const existingSite = await strapi.documents('api::site-setting.site-setting').findFirst({});
  if (siteSetting && !existingSite) {
    await strapi.documents('api::site-setting.site-setting').create({
      data: siteSetting,
    });
    strapi.log.info('Seeded site settings');
  }

}
