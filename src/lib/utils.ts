import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Capitalizes the first letter of each word in a company name
 * @param companyName - The company name (typically stored in lowercase)
 * @returns The company name with proper capitalization
 */
export function capitalizeCompanyName(companyName: string): string {
  if (!companyName) return companyName;
  return companyName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
