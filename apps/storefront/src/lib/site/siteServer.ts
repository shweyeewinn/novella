import { site as staticSite } from "@/config/site";
import { isStrapiEnabled } from "@/lib/strapi/client";
import { fetchSiteSettingsFromStrapi } from "@/lib/strapi/site";

export type SiteConfig = {
  name: string;
  faviconSrc: string;
  tagline: string;
  owner: { name: string; email: string };
  payment: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    transferNote?: string;
  };
  facebook: (typeof staticSite)["facebook"];
};

export async function getSiteConfig(): Promise<SiteConfig> {
  if (!isStrapiEnabled()) return staticSite;
  const cms = await fetchSiteSettingsFromStrapi();
  if (!cms) return staticSite;
  return {
    ...staticSite,
    name: cms.name,
    tagline: cms.tagline,
    owner: cms.owner,
    payment: cms.payment,
  };
}
