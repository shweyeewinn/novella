import { emptyShippingAddress, type ShippingAddress } from "@/types/auth";

export function normalizeShippingAddress(
  address: Partial<ShippingAddress> | null | undefined
): ShippingAddress {
  const base = emptyShippingAddress();
  if (!address || typeof address !== "object") return base;
  return {
    fullName: address.fullName ?? base.fullName,
    phone: address.phone ?? base.phone,
    line1: address.line1 ?? base.line1,
    line2: address.line2 ?? base.line2,
    city: address.city ?? base.city,
    region: address.region ?? base.region,
    postalCode: address.postalCode ?? base.postalCode,
    country: address.country ?? base.country,
  };
}

export function isShippingComplete(
  address: Partial<ShippingAddress> | null | undefined
): boolean {
  const s = normalizeShippingAddress(address);
  return Boolean(
    s.fullName.trim() &&
      s.phone.trim() &&
      s.line1.trim() &&
      s.city.trim() &&
      s.region.trim() &&
      s.country.trim()
  );
}
