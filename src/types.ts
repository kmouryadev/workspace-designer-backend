export type CatalogItem = {
  id: string;
  category: string;
  name: string;
  spec: string;
  priceK: number;
  maxQuantity: number;
};

export type RentalRequestInput = {
  fullName: string;
  email: string;
  whatsapp: string;
  location: string;
  startDate: string;
  duration: "weekly" | "biweekly" | "monthly" | "yearly";
  message?: string;
  setupDesk?: string | null;
  setupChair?: string | null;
  setupItems?: Record<string, number>;
  monthlyTotalK: number;
  periodTotalK: number;
};

export type FieldErrors = Partial<Record<keyof RentalRequestInput, string>>;
