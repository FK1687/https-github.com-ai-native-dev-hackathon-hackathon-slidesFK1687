import { describe, it, expect } from 'vitest';
import { generateProducts, generateOptions, generateFilters } from '../seed-data';

describe('generateProducts', () => {
  it('generates 796 products by default', () => {
    const products = generateProducts();
    expect(products).toHaveLength(796);
  });

  it('generates the requested count', () => {
    const products = generateProducts(10);
    expect(products).toHaveLength(10);
  });

  it('produces deterministic output (seeded random)', () => {
    const a = generateProducts(50);
    const b = generateProducts(50);
    expect(a.map((p) => p.id)).toEqual(b.map((p) => p.id));
    expect(a.map((p) => p.name)).toEqual(b.map((p) => p.name));
  });

  it('distributes across 10 categories', () => {
    const products = generateProducts(796);
    const categories = new Set(products.map((p) => p.category));
    expect(categories.size).toBe(10);
  });

  it('assigns valid IDs in format kleb-XXXX', () => {
    const products = generateProducts(10);
    for (const p of products) {
      expect(p.id).toMatch(/^kleb-\d{4}$/);
    }
  });

  it('assigns valid SKUs', () => {
    const products = generateProducts(10);
    for (const p of products) {
      expect(p.sku).toMatch(/^KLB-[A-Z]{3}-\d{4}$/);
    }
  });

  it('products have valid property ranges', () => {
    const products = generateProducts(100);
    for (const p of products) {
      expect(p.properties.temperatureMin).toBeLessThan(p.properties.temperatureMax);
      expect(p.properties.adhesionStrength).toBeGreaterThan(0);
      expect(p.properties.temperatureMax).toBeLessThanOrEqual(260);
      expect(p.application.length).toBeGreaterThan(0);
      expect(p.substrate.length).toBeGreaterThan(0);
      expect(p.certification.length).toBeGreaterThan(0);
      expect(p.availableWidths.length).toBeGreaterThan(0);
      expect(p.availableLengths.length).toBeGreaterThan(0);
    }
  });
});

describe('generateOptions', () => {
  it('returns all label mappings', () => {
    const options = generateOptions();
    expect(Object.keys(options.categoryLabels).length).toBe(10);
    expect(Object.keys(options.applicationLabels).length).toBe(14);
    expect(Object.keys(options.adhesiveLabels).length).toBe(12);
    expect(Object.keys(options.substrateLabels).length).toBe(14);
    expect(Object.keys(options.environmentLabels).length).toBe(5);
    expect(Object.keys(options.certificationLabels).length).toBe(10);
  });

  it('labels are human-readable strings', () => {
    const options = generateOptions();
    expect(options.categoryLabels['packaging']).toBe('Packaging');
    expect(options.environmentLabels['high-temp']).toBe('High Temperature');
  });
});

describe('generateFilters', () => {
  it('returns all filter configuration fields', () => {
    const filters = generateFilters();
    expect(filters.categories).toHaveLength(10);
    expect(filters.applications).toHaveLength(14);
    expect(filters.adhesiveTypes).toHaveLength(12);
    expect(filters.substrates).toHaveLength(14);
    expect(filters.environments).toHaveLength(5);
    expect(filters.certifications).toHaveLength(10);
    expect(filters.properties).toHaveLength(8);
    expect(filters.temperatureRange).toEqual({ min: -70, max: 260 });
    expect(filters.adhesionRange).toEqual({ min: 0, max: 15 });
  });
});
