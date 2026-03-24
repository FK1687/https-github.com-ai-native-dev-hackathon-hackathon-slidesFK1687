import { describe, it, expect } from 'vitest';
import { filterProducts, sortProducts } from '../use-filter-products';
import type { Product, ProductCategory } from '@/types';

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 'test-001',
    name: 'Test Product',
    sku: 'KLB-TST-0001',
    category: 'packaging',
    application: ['bonding'],
    material: 'Polyester (PET)',
    adhesiveType: 'acrylic',
    description: 'Test description',
    shortDescription: 'Test short',
    properties: {
      uvResistance: false,
      waterResistance: true,
      solventResistance: false,
      foodSafe: false,
      flameRetardant: false,
      antistatic: false,
      transparentBond: false,
      removable: false,
      adhesionStrength: 5.0,
      temperatureMin: -20,
      temperatureMax: 150,
    },
    availableWidths: [25, 50],
    availableLengths: [33, 66],
    color: 'Clear',
    substrate: ['metal', 'plastic'],
    environment: 'indoor',
    certification: ['REACH'],
    shelfLife: 24,
    tags: ['permanent', 'film'],
    ...overrides,
  };
}

const defaultParams = {
  search: '',
  categories: [] as ProductCategory[],
  applications: [],
  tempRange: [-70, 260] as [number, number],
  adhesionRange: [0, 15] as [number, number],
  properties: [],
  adhesiveTypes: [],
  substrates: [],
  environments: [],
  certifications: [],
};

const testProducts = [
  makeProduct({ id: 'p1', name: 'Alpha Tape', category: 'packaging', properties: { ...makeProduct().properties, adhesionStrength: 3.0, temperatureMin: -10, temperatureMax: 100, uvResistance: true, waterResistance: true } }),
  makeProduct({ id: 'p2', name: 'Beta Adhesive', category: 'automotive', adhesiveType: 'rubber', properties: { ...makeProduct().properties, adhesionStrength: 8.0, temperatureMin: -40, temperatureMax: 200 }, substrate: ['metal', 'glass'], environment: 'outdoor', certification: ['RoHS', 'UL'] }),
  makeProduct({ id: 'p3', name: 'Gamma Film', category: 'electronics', adhesiveType: 'silicone', properties: { ...makeProduct().properties, adhesionStrength: 1.5, temperatureMin: 0, temperatureMax: 260, antistatic: true, foodSafe: true }, tags: ['ultra-thin', 'clear-bond'] }),
  makeProduct({ id: 'p4', name: 'Delta Bond', category: 'packaging', application: ['mounting', 'bonding'], properties: { ...makeProduct().properties, adhesionStrength: 12.0, temperatureMin: -20, temperatureMax: 80 } }),
  makeProduct({ id: 'p5', name: 'Epsilon Wrap', category: 'medical', properties: { ...makeProduct().properties, adhesionStrength: 2.0, temperatureMin: 5, temperatureMax: 50, foodSafe: true, removable: true }, substrate: ['fabric', 'foam'] }),
];

describe('filterProducts', () => {
  it('returns all products with no filters', () => {
    const result = filterProducts(testProducts, defaultParams);
    expect(result).toHaveLength(5);
  });

  it('filters by text search on name', () => {
    const result = filterProducts(testProducts, { ...defaultParams, search: 'alpha' });
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe('p1');
  });

  it('filters by text search on SKU', () => {
    const result = filterProducts(testProducts, { ...defaultParams, search: 'KLB-TST' });
    expect(result).toHaveLength(5);
  });

  it('filters by text search on tags', () => {
    const result = filterProducts(testProducts, { ...defaultParams, search: 'ultra-thin' });
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe('p3');
  });

  it('filters by category (OR logic)', () => {
    const result = filterProducts(testProducts, { ...defaultParams, categories: ['packaging'] });
    expect(result).toHaveLength(2);
    expect(result.map((p) => p.id).sort()).toEqual(['p1', 'p4']);
  });

  it('filters by multiple categories (OR logic)', () => {
    const result = filterProducts(testProducts, { ...defaultParams, categories: ['packaging', 'electronics'] });
    expect(result).toHaveLength(3);
  });

  it('filters by application (OR logic)', () => {
    const result = filterProducts(testProducts, { ...defaultParams, applications: ['mounting'] });
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe('p4');
  });

  it('filters by properties (AND logic)', () => {
    const result = filterProducts(testProducts, { ...defaultParams, properties: ['foodSafe'] });
    expect(result).toHaveLength(2);
    expect(result.map((p) => p.id).sort()).toEqual(['p3', 'p5']);
  });

  it('filters by multiple properties (AND logic)', () => {
    const result = filterProducts(testProducts, { ...defaultParams, properties: ['foodSafe', 'removable'] });
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe('p5');
  });

  it('filters by temperature range overlap', () => {
    const result = filterProducts(testProducts, { ...defaultParams, tempRange: [200, 260] });
    expect(result).toHaveLength(2);
    expect(result.map((p) => p.id).sort()).toEqual(['p2', 'p3']);
  });

  it('excludes products outside temperature range', () => {
    const result = filterProducts(testProducts, { ...defaultParams, tempRange: [250, 260] });
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe('p3');
  });

  it('filters by adhesion range', () => {
    const result = filterProducts(testProducts, { ...defaultParams, adhesionRange: [5, 15] });
    expect(result).toHaveLength(2);
    expect(result.map((p) => p.id).sort()).toEqual(['p2', 'p4']);
  });

  it('filters by adhesive type (OR)', () => {
    const result = filterProducts(testProducts, { ...defaultParams, adhesiveTypes: ['silicone'] });
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe('p3');
  });

  it('filters by substrate (OR)', () => {
    const result = filterProducts(testProducts, { ...defaultParams, substrates: ['glass'] });
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe('p2');
  });

  it('filters by environment (OR)', () => {
    const result = filterProducts(testProducts, { ...defaultParams, environments: ['outdoor'] });
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe('p2');
  });

  it('filters by certification (OR)', () => {
    const result = filterProducts(testProducts, { ...defaultParams, certifications: ['UL'] });
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe('p2');
  });

  it('combines multiple filters', () => {
    const result = filterProducts(testProducts, {
      ...defaultParams,
      categories: ['packaging'],
      adhesionRange: [0, 5],
    });
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe('p1');
  });
});

describe('sortProducts', () => {
  it('sorts by name alphabetically', () => {
    const sorted = sortProducts(testProducts, 'name');
    expect(sorted.map((p) => p.name)).toEqual([
      'Alpha Tape', 'Beta Adhesive', 'Delta Bond', 'Epsilon Wrap', 'Gamma Film',
    ]);
  });

  it('sorts by adhesion ascending', () => {
    const sorted = sortProducts(testProducts, 'adhesion-asc');
    expect(sorted.map((p) => p.properties.adhesionStrength)).toEqual([1.5, 2.0, 3.0, 8.0, 12.0]);
  });

  it('sorts by adhesion descending', () => {
    const sorted = sortProducts(testProducts, 'adhesion-desc');
    expect(sorted.map((p) => p.properties.adhesionStrength)).toEqual([12.0, 8.0, 3.0, 2.0, 1.5]);
  });

  it('sorts by temperature range (widest first)', () => {
    const sorted = sortProducts(testProducts, 'temp-range');
    const ranges = sorted.map((p) => p.properties.temperatureMax - p.properties.temperatureMin);
    for (let i = 1; i < ranges.length; i++) {
      expect(ranges[i]! <= ranges[i - 1]!).toBe(true);
    }
  });

  it('does not mutate the original array', () => {
    const original = [...testProducts];
    sortProducts(testProducts, 'name');
    expect(testProducts.map((p) => p.id)).toEqual(original.map((p) => p.id));
  });
});
