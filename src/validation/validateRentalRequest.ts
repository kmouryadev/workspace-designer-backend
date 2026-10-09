import type { FieldErrors, RentalRequestInput } from "../types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidWhatsapp(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed.startsWith("+")) return false;
  const digits = trimmed.slice(1).replace(/[\s-]/g, "");
  return /^\d{8,15}$/.test(digits);
}

export function validateRentalRequest(input: RentalRequestInput): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.fullName?.trim()) {
    errors.fullName = "Enter your full name.";
  }

  if (!input.email?.trim() || !EMAIL_RE.test(input.email.trim())) {
    errors.email = "Enter a valid email, like name@example.com.";
  }

  if (!input.whatsapp || !isValidWhatsapp(input.whatsapp)) {
    errors.whatsapp = "Use a number with country code, like +62 812 3456 7890.";
  }

  if (!input.location?.trim()) {
    errors.location = "Tell us where in Bali to deliver.";
  }

  if (!input.startDate) {
    errors.startDate = "Choose a start date.";
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosen = new Date(input.startDate);
    if (chosen < today) {
      errors.startDate = "The start date cannot be in the past.";
    }
  }

  return errors;
}
