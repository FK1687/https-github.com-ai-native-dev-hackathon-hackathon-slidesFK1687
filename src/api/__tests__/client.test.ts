import { describe, it, expect, vi, beforeEach } from 'vitest';

// Reset the module state between tests by using dynamic import
let fetchProducts: typeof import('../client').fetchProducts;
let fetchProduct: typeof import('../client').fetchProduct;
let fetchFilters: typeof import('../client').fetchFilters;
let fetchOptions: typeof import('../client').fetchOptions;
let fetchAvailableSlots: typeof import('../client').fetchAvailableSlots;
let bookAppointment: typeof import('../client').bookAppointment;
let submitContact: typeof import('../client').submitContact;

beforeEach(async () => {
  vi.useFakeTimers();
  vi.resetModules();
  const mod = await import('../client');
  fetchProducts = mod.fetchProducts;
  fetchProduct = mod.fetchProduct;
  fetchFilters = mod.fetchFilters;
  fetchOptions = mod.fetchOptions;
  fetchAvailableSlots = mod.fetchAvailableSlots;
  bookAppointment = mod.bookAppointment;
  submitContact = mod.submitContact;
});

afterEach(() => {
  vi.useRealTimers();
});

describe('fetchProducts', () => {
  it('returns ~796 products', async () => {
    const promise = fetchProducts();
    vi.advanceTimersByTime(300);
    const products = await promise;
    expect(products).toHaveLength(796);
  });

  it('products have correct shape', async () => {
    const promise = fetchProducts();
    vi.advanceTimersByTime(300);
    const products = await promise;
    const p = products[0]!;
    expect(p).toHaveProperty('id');
    expect(p).toHaveProperty('name');
    expect(p).toHaveProperty('sku');
    expect(p).toHaveProperty('category');
    expect(p).toHaveProperty('properties');
    expect(p).toHaveProperty('properties.adhesionStrength');
    expect(p).toHaveProperty('properties.temperatureMin');
    expect(p).toHaveProperty('properties.temperatureMax');
  });
});

describe('fetchProduct', () => {
  it('returns a product for valid ID', async () => {
    const promise = fetchProduct('kleb-0001');
    vi.advanceTimersByTime(300);
    const product = await promise;
    expect(product).toBeDefined();
    expect(product!.id).toBe('kleb-0001');
  });

  it('returns undefined for invalid ID', async () => {
    const promise = fetchProduct('nonexistent');
    vi.advanceTimersByTime(300);
    const product = await promise;
    expect(product).toBeUndefined();
  });
});

describe('fetchFilters', () => {
  it('returns a FilterConfiguration with all fields', async () => {
    const promise = fetchFilters();
    vi.advanceTimersByTime(300);
    const filters = await promise;
    expect(filters.categories).toBeDefined();
    expect(filters.categories.length).toBeGreaterThan(0);
    expect(filters.applications).toBeDefined();
    expect(filters.adhesiveTypes).toBeDefined();
    expect(filters.substrates).toBeDefined();
    expect(filters.environments).toBeDefined();
    expect(filters.certifications).toBeDefined();
    expect(filters.properties).toBeDefined();
    expect(filters.temperatureRange).toEqual({ min: -70, max: 260 });
    expect(filters.adhesionRange).toEqual({ min: 0, max: 15 });
  });
});

describe('fetchOptions', () => {
  it('returns OptionsData with all label mappings', async () => {
    const promise = fetchOptions();
    vi.advanceTimersByTime(300);
    const options = await promise;
    expect(options.categoryLabels).toBeDefined();
    expect(options.categoryLabels['packaging']).toBe('Packaging');
    expect(options.applicationLabels).toBeDefined();
    expect(options.adhesiveLabels).toBeDefined();
    expect(options.substrateLabels).toBeDefined();
    expect(options.environmentLabels).toBeDefined();
    expect(options.certificationLabels).toBeDefined();
  });
});

describe('fetchAvailableSlots', () => {
  it('returns 10 business days with time slots', async () => {
    vi.setSystemTime(new Date('2026-03-24T10:00:00Z'));
    const promise = fetchAvailableSlots();
    vi.advanceTimersByTime(500);
    const slots = await promise;
    expect(slots.length).toBe(10);
    for (const slot of slots) {
      expect(slot.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(slot.times.length).toBeGreaterThan(0);
    }
  });
});

describe('bookAppointment', () => {
  it('succeeds with valid input', async () => {
    const promise = bookAppointment({
      name: 'John', email: 'john@example.com', date: '2026-03-25', time: '09:00',
    });
    vi.advanceTimersByTime(600);
    const result = await promise;
    expect(result.success).toBe(true);
    expect(result.appointment.status).toBe('confirmed');
    expect(result.appointment.id).toMatch(/^apt-/);
  });

  it('throws on missing required fields', async () => {
    const promise = bookAppointment({ name: '', email: 'x@x.com', date: '2026-03-25', time: '09:00' });
    vi.advanceTimersByTime(600);
    await expect(promise).rejects.toThrow('Missing required fields');
  });

  it('throws on invalid email format', async () => {
    const promise = bookAppointment({ name: 'John', email: 'invalid', date: '2026-03-25', time: '09:00' });
    vi.advanceTimersByTime(600);
    await expect(promise).rejects.toThrow('Invalid email format');
  });

  it('throws on double-booking the same slot', async () => {
    const first = bookAppointment({ name: 'A', email: 'a@b.com', date: '2026-04-01', time: '10:00' });
    vi.advanceTimersByTime(600);
    await first;

    const second = bookAppointment({ name: 'B', email: 'b@b.com', date: '2026-04-01', time: '10:00' });
    vi.advanceTimersByTime(600);
    await expect(second).rejects.toThrow('no longer available');
  });
});

describe('submitContact', () => {
  it('succeeds with valid input', async () => {
    const promise = submitContact({ name: 'Jane', email: 'jane@test.com', message: 'Hello' });
    vi.advanceTimersByTime(600);
    const result = await promise;
    expect(result.success).toBe(true);
    expect(result.contactId).toMatch(/^contact-/);
  });

  it('throws on missing required fields', async () => {
    const promise = submitContact({ name: '', email: 'x@x.com', message: 'Hi' });
    vi.advanceTimersByTime(600);
    await expect(promise).rejects.toThrow('Missing required fields');
  });
});
