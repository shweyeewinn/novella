const MYANMAR_LETTER = /[\u1000-\u109F]/;
const LATIN_LETTER = /[A-Za-z]/;

const myanmarCollator = new Intl.Collator("my", { sensitivity: "base", numeric: true });
const englishCollator = new Intl.Collator("en", { sensitivity: "base", numeric: true });

/** True when the name should sort under မြန်မာ အက္ခရာ (leading Burmese script). */
export function isMyanmarAuthor(name: string): boolean {
  const myanmarCount = (name.match(/[\u1000-\u109F]/g) ?? []).length;
  const latinCount = (name.match(/[A-Za-z]/g) ?? []).length;
  if (myanmarCount === 0) return false;
  if (latinCount === 0) return true;

  const firstLetter = name.match(MYANMAR_LETTER) ?? name.match(LATIN_LETTER);
  if (!firstLetter) return myanmarCount >= latinCount;
  return MYANMAR_LETTER.test(firstLetter[0]);
}

export function sortMyanmarAuthors(names: string[]): string[] {
  return [...names].sort((a, b) => myanmarCollator.compare(a, b));
}

export function sortEnglishAuthors(names: string[]): string[] {
  return [...names].sort((a, b) => englishCollator.compare(a, b));
}

export function partitionAndSortAuthors(names: string[]): {
  myanmar: string[];
  english: string[];
  flat: string[];
} {
  const myanmar: string[] = [];
  const english: string[] = [];

  for (const name of names) {
    if (isMyanmarAuthor(name)) myanmar.push(name);
    else english.push(name);
  }

  const sortedMyanmar = sortMyanmarAuthors(myanmar);
  const sortedEnglish = sortEnglishAuthors(english);

  return {
    myanmar: sortedMyanmar,
    english: sortedEnglish,
    flat: [...sortedMyanmar, ...sortedEnglish],
  };
}
