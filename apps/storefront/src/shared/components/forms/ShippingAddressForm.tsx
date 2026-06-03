"use client";

import type { ShippingAddress } from "@/features/auth/types";

const inputClass =
  "w-full rounded-md border border-border bg-paper px-4 py-2.5 font-sans text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30";

const labelClass = "font-sans text-sm font-medium text-ink";

type ShippingAddressFormProps = {
  value: ShippingAddress;
  onChange: (value: ShippingAddress) => void;
  idPrefix?: string;
  required?: boolean;
};

export default function ShippingAddressForm({
  value,
  onChange,
  idPrefix = "ship",
  required = true,
}: ShippingAddressFormProps) {
  const req = required ? "required" : undefined;

  const set = (field: keyof ShippingAddress, fieldValue: string) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <label htmlFor={`${idPrefix}-name`} className={labelClass}>
          Full name
        </label>
        <input
          id={`${idPrefix}-name`}
          type="text"
          autoComplete="name"
          value={value.fullName}
          onChange={(e) => set("fullName", e.target.value)}
          className={inputClass}
          required={required}
        />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <label htmlFor={`${idPrefix}-phone`} className={labelClass}>
          Phone
        </label>
        <input
          id={`${idPrefix}-phone`}
          type="tel"
          autoComplete="tel"
          value={value.phone}
          onChange={(e) => set("phone", e.target.value)}
          className={inputClass}
          required={required}
        />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <label htmlFor={`${idPrefix}-line1`} className={labelClass}>
          Address
        </label>
        <input
          id={`${idPrefix}-line1`}
          type="text"
          autoComplete="street-address"
          value={value.line1}
          onChange={(e) => set("line1", e.target.value)}
          className={inputClass}
          required={required}
        />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <label htmlFor={`${idPrefix}-line2`} className={labelClass}>
          Apartment, suite, etc. (optional)
        </label>
        <input
          id={`${idPrefix}-line2`}
          type="text"
          value={value.line2}
          onChange={(e) => set("line2", e.target.value)}
          className={inputClass}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor={`${idPrefix}-city`} className={labelClass}>
          City / township
        </label>
        <input
          id={`${idPrefix}-city`}
          type="text"
          autoComplete="address-level2"
          value={value.city}
          onChange={(e) => set("city", e.target.value)}
          className={inputClass}
          required={required}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor={`${idPrefix}-region`} className={labelClass}>
          State / region
        </label>
        <input
          id={`${idPrefix}-region`}
          type="text"
          autoComplete="address-level1"
          value={value.region}
          onChange={(e) => set("region", e.target.value)}
          className={inputClass}
          required={required}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor={`${idPrefix}-postal`} className={labelClass}>
          Postal code (optional)
        </label>
        <input
          id={`${idPrefix}-postal`}
          type="text"
          autoComplete="postal-code"
          value={value.postalCode}
          onChange={(e) => set("postalCode", e.target.value)}
          className={inputClass}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor={`${idPrefix}-country`} className={labelClass}>
          Country
        </label>
        <input
          id={`${idPrefix}-country`}
          type="text"
          autoComplete="country-name"
          value={value.country}
          onChange={(e) => set("country", e.target.value)}
          className={inputClass}
          required={required}
        />
      </div>
    </div>
  );
}
