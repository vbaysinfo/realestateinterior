export interface PropertyCategory {
  label: string
  unit: string
  types: string[]
  emoji: string
}

export const PROPERTY_CATEGORIES: PropertyCategory[] = [
  {
    label: 'Agriculture Land',
    unit: 'Cents',
    types: [],
    emoji: '🌾',
  },
  {
    label: 'Open Plots',
    unit: 'Sq Yard',
    types: [],
    emoji: '🏞️',
  },
  {
    label: 'Residential',
    unit: 'Sq Feet',
    types: ['Flats', 'Independent House', 'Villa'],
    emoji: '🏠',
  },
  {
    label: 'Commercial',
    unit: 'Sq Feet',
    types: ['Office Space', 'Shop', 'Commercial Building', 'Warehouse'],
    emoji: '🏢',
  },
]

export function getCategoryByLabel(label: string): PropertyCategory | undefined {
  return PROPERTY_CATEGORIES.find(c => c.label === label)
}

export function getUnitForCategory(category: string): string {
  return getCategoryByLabel(category)?.unit || 'Sq Feet'
}

export function getTypesForCategory(category: string): string[] {
  return getCategoryByLabel(category)?.types || []
}
