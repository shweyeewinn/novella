export type ShippingAddress = {
  fullName: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};

export const emptyShippingAddress = (): ShippingAddress => ({
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  region: "",
  postalCode: "",
  country: "Myanmar",
});

export type User = {
  id: string;
  email: string;
  name: string;
  shipping: ShippingAddress;
  createdAt: string;
};

export type StoredUser = User & {
  passwordHash: string;
};

export type SessionUser = Pick<User, "id" | "email" | "name">;
