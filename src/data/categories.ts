import type { ProductCategoryInfo, CropCategory } from '@/types';

export const productCategories: ProductCategoryInfo[] = [
  {
    slug: 'chilli',
    name: 'Chilli',
    shortLabel: 'Hybrid chilli varieties',
    description: 'Pungent and mild hybrid chilli varieties for diverse market preferences.',
    imageQuery: 'green chilli pepper plant farm',
  },
  {
    slug: 'cucumber',
    name: 'Cucumber',
    shortLabel: 'Hybrid cucumber varieties',
    description: 'High-yielding cucumber hybrids with excellent fruit quality and vigour.',
    imageQuery: 'cucumber plant farming greenhouse',
  },
  {
    slug: 'tomato',
    name: 'Tomato',
    shortLabel: 'Hybrid tomato varieties',
    description: 'Disease-tolerant tomato hybrids producing firm, marketable fruit.',
    imageQuery: 'tomato plant farming ripe red',
  },
  {
    slug: 'brinjal',
    name: 'Brinjal',
    shortLabel: 'Hybrid brinjal varieties',
    description: 'Productive brinjal hybrids with attractive fruit shape and colour.',
    imageQuery: 'eggplant brinjal farming plant',
  },
  {
    slug: 'sweet-corn',
    name: 'Sweet Corn',
    shortLabel: 'Hybrid sweet corn varieties',
    description: 'Sweet, tender corn hybrids suited for fresh market and processing.',
    imageQuery: 'sweet corn cob farming field',
  },
];

export const categoryMap: Record<CropCategory, ProductCategoryInfo> = productCategories.reduce(
  (acc, cat) => ({ ...acc, [cat.slug]: cat }),
  {} as Record<CropCategory, ProductCategoryInfo>
);

export function categoryName(slug: CropCategory): string {
  return categoryMap[slug]?.name ?? slug;
}
