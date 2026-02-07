import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchMeal, getMealByID } from './mealApi';

// Mock global fetch since client-side code uses fetch to call the API
global.fetch = vi.fn();

describe('searchMeal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return meals when API call works', async () => {
    const mockResponse = {
      meals: [
        { idMeal: '1', strMeal: 'Pasta' },
        { idMeal: '2', strMeal: 'Pizza' }
      ]
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const result = await searchMeal('pasta');

    expect(result).toHaveLength(2);
    // expect(result[0].strMeal).toBe('Pasta');
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('pasta')
    );
  });

  it('should return empty array when no meals found', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: null })
    });

    const result = await searchMeal('xyzabc');

    expect(result).toEqual([]);
  });


  // Don't know why this doesnt work :(
  it('should handle API errors', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const result = await searchMeal('pasta');

    expect(result).toEqual([]);
  });
});

describe('getMealByID', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return meal when ID is valid', async () => {
    const mockMeal = { idMeal: '52772', strMeal: 'Teriyaki Chicken' };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: [mockMeal] })
    });

    const result = await getMealByID('52772');

    expect(result).toEqual(mockMeal);
  });

  it('should return null when ID is invalid', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: null })
    });

    const result = await getMealByID('99999');

    expect(result).toBeNull();
  });
});