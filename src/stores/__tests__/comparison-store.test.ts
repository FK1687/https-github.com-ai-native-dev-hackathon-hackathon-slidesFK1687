import { describe, it, expect, beforeEach } from 'vitest';
import { useComparisonStore } from '../comparison-store';

describe('useComparisonStore', () => {
  beforeEach(() => {
    useComparisonStore.setState({ compareList: [] });
  });

  it('starts with empty compare list', () => {
    expect(useComparisonStore.getState().compareList).toEqual([]);
  });

  describe('addToCompare', () => {
    it('adds a product ID to the list', () => {
      useComparisonStore.getState().addToCompare('product-1');
      expect(useComparisonStore.getState().compareList).toEqual(['product-1']);
    });

    it('adds multiple product IDs', () => {
      const { addToCompare } = useComparisonStore.getState();
      addToCompare('p1');
      addToCompare('p2');
      addToCompare('p3');
      expect(useComparisonStore.getState().compareList).toEqual(['p1', 'p2', 'p3']);
    });

    it('is a no-op when the list already has 4 items', () => {
      useComparisonStore.setState({ compareList: ['a', 'b', 'c', 'd'] });
      useComparisonStore.getState().addToCompare('e');
      expect(useComparisonStore.getState().compareList).toEqual(['a', 'b', 'c', 'd']);
    });

    it('is a no-op for duplicate IDs', () => {
      useComparisonStore.getState().addToCompare('p1');
      useComparisonStore.getState().addToCompare('p1');
      expect(useComparisonStore.getState().compareList).toEqual(['p1']);
    });
  });

  describe('removeFromCompare', () => {
    it('removes the specified product ID', () => {
      useComparisonStore.setState({ compareList: ['p1', 'p2', 'p3'] });
      useComparisonStore.getState().removeFromCompare('p2');
      expect(useComparisonStore.getState().compareList).toEqual(['p1', 'p3']);
    });

    it('is a no-op for IDs not in the list', () => {
      useComparisonStore.setState({ compareList: ['p1'] });
      useComparisonStore.getState().removeFromCompare('p999');
      expect(useComparisonStore.getState().compareList).toEqual(['p1']);
    });
  });

  describe('clearCompare', () => {
    it('empties the list', () => {
      useComparisonStore.setState({ compareList: ['p1', 'p2'] });
      useComparisonStore.getState().clearCompare();
      expect(useComparisonStore.getState().compareList).toEqual([]);
    });
  });

  describe('isInCompare', () => {
    it('returns true for IDs in the list', () => {
      useComparisonStore.setState({ compareList: ['p1', 'p2'] });
      expect(useComparisonStore.getState().isInCompare('p1')).toBe(true);
    });

    it('returns false for IDs not in the list', () => {
      useComparisonStore.setState({ compareList: ['p1'] });
      expect(useComparisonStore.getState().isInCompare('p999')).toBe(false);
    });

    it('returns false for empty list', () => {
      expect(useComparisonStore.getState().isInCompare('p1')).toBe(false);
    });
  });
});
