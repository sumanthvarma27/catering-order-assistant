// lib/menuHelper.ts

export interface Dish {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
}

export function findSimilarDishes(menu: Dish[], query: string): Dish[] {
  if (!query) return [];

  const normalizedQuery = query.toLowerCase();
  const matchedCategory = getCategory(normalizedQuery);

  // Step 1: try direct name matches
  const directMatches = menu.filter((d) =>
    d.name.toLowerCase().includes(normalizedQuery)
  );

  if (directMatches.length > 0) return directMatches.slice(0, 3);

  // Step 2: try category matches
  const categoryMatches = menu.filter(
    (d) => d.category.toLowerCase() === matchedCategory
  );

  if (categoryMatches.length > 0) return categoryMatches.slice(0, 3);

  // Step 3: fallback to partial matches
  const partialMatches = menu.filter(
    (d) =>
      d.name.toLowerCase().includes(normalizedQuery.split(' ')[0]) ||
      d.description.toLowerCase().includes(normalizedQuery.split(' ')[0])
  );

  return partialMatches.slice(0, 3);
}

function getCategory(query: string): string {
  if (query.includes('starter') || query.includes('appetizer')) return 'Starters';
  if (query.includes('rice') || query.includes('biryani')) return 'Rice';
  if (query.includes('dessert') || query.includes('sweet')) return 'Desserts';
  if (query.includes('entree') || query.includes('main')) return 'Entrees';
  return '';
}
