export interface TrayItem {
  id: number;
  name: string;
  category: string;
  suggested: string;
  size: 'HALF' | 'MEDIUM' | 'LARGE';
  count: number;
  price?: number;
}

export interface TraySize {
  code: 'HALF' | 'MEDIUM' | 'LARGE';
  label: string;
  servings: string;
}

export interface ChatResponse {
  message: string;
  detailsComplete?: boolean;
  menuItems?: TrayItem[];
}

export interface CustomerDetails {
  occasion?: string;
  guestCount?: number;
  date?: string;
  budget?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  specialRequirements?: string;
}

// Tray sizes by category
export const TRAY_SIZES_APPETIZERS: TraySize[] = [
  { code: 'HALF', label: 'Small Tray', servings: '10 people' },
  { code: 'MEDIUM', label: 'Medium Tray', servings: '18-20 people' },
  { code: 'LARGE', label: 'Large Tray', servings: '25 people' },
];

export const TRAY_SIZES_ENTREES: TraySize[] = [
  { code: 'HALF', label: 'Small Tray', servings: '10-12 people' },
  { code: 'MEDIUM', label: 'Medium Tray', servings: '20 people' },
  { code: 'LARGE', label: 'Large Tray', servings: '25 people' },
];

export const TRAY_SIZES_RICE_BIRYANI: TraySize[] = [
  { code: 'HALF', label: 'Small Tray', servings: '6 people' },
  { code: 'MEDIUM', label: 'Medium Tray', servings: '12-14 people' },
  { code: 'LARGE', label: 'Large Tray', servings: '15-18 people' },
];

export const TRAY_SIZES_DESSERTS: TraySize[] = [
  { code: 'HALF', label: 'Small Tray', servings: '20 pieces' },
  { code: 'MEDIUM', label: 'Medium Tray', servings: '40 pieces' },
  { code: 'LARGE', label: 'Large Tray', servings: '60 pieces' },
];

export function getTraySize(category: string): TraySize[] {
  const lowerCategory = category.toLowerCase();
  if (lowerCategory.includes('appetizer')) {
    return TRAY_SIZES_APPETIZERS;
  } else if (lowerCategory.includes('entree')) {
    return TRAY_SIZES_ENTREES;
  } else if (lowerCategory.includes('rice') || lowerCategory.includes('biryani') || lowerCategory.includes('pulao')) {
    return TRAY_SIZES_RICE_BIRYANI;
  } else if (lowerCategory.includes('dessert')) {
    return TRAY_SIZES_DESSERTS;
  }
  return TRAY_SIZES_ENTREES; // Default
}