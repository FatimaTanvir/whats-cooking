// utils/formatter.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { displayMealList, displayMealDetails } from './formatter';
import type { Meal } from '../types/meal';
import * as mealApi from '../api/mealApi';


// vi.fn = creates a new fake function that can be used to spy on calls to it and control its behavior in tests.
// vi.spy = creates a spy on an existing function, allowing you to track calls to that function and optionally modify its behavior.
// beforeEach = a hook that runs before each test in a test suite, allowing you to set up any necessary state or mocks before each test runs.
// afterEach = a hook that runs after each test in a test suite, allowing you to clean up any state or mocks after each test runs.
// toHaveBeenCalledWith = a matcher that checks if a mock function was called with specific arguments.
// toHaveBeenCalledTimes = a matcher that checks if a mock function was called a specific number of times.
// toBe = a matcher that checks if a value is strictly equal to another value.
// moclImplementation = a method that allows you to specify the implementation of a mock function, which will be used when the function is called in tests.


describe('displayMealList', () => {
  let consoleLogSpy: any;

  beforeEach(() => {
    // Capture console.log calls
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    // Clean up after each test
    consoleLogSpy.mockRestore();
  });

  it('should display a list of meals', () => {
    const meals: Meal[] = [
      { idMeal: '1', strMeal: 'Spaghetti Carbonara' } as Meal,
      { idMeal: '2', strMeal: 'Chicken Tikka' } as Meal,
    ];

    displayMealList(meals);

    expect(consoleLogSpy).toHaveBeenCalledWith('\nRecipes Found: \n');
    expect(consoleLogSpy).toHaveBeenCalledWith('1 - Spaghetti Carbonara');
    expect(consoleLogSpy).toHaveBeenCalledWith('2 - Chicken Tikka');
  });

  it('should handle empty meal list', () => {
    displayMealList([]);

    expect(consoleLogSpy).toHaveBeenCalledWith('\nRecipes Found: \n');
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
  });
});

describe('displayMealDetails', () => {
  let consoleLogSpy: any;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    // Mock the getIngredients function
    vi.spyOn(mealApi, 'getIngredients').mockReturnValue([
      { ingredient: 'Pasta', measure: '200g' },
      { ingredient: 'Eggs', measure: '2' }
    ]);
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    vi.restoreAllMocks();
  });

  it('should display meal details with ingredients', () => {
    const meal: Meal = {
      idMeal: '1',
      strMeal: 'Spaghetti Carbonara',
      strCategory: 'Pasta',
      strArea: 'Italian',
      strInstructions: 'Cook pasta. Add eggs and cheese.'
    } as Meal;

    displayMealDetails(meal);

    expect(consoleLogSpy).toHaveBeenCalledWith('\nRecipe Details: \n');
    expect(consoleLogSpy).toHaveBeenCalledWith('Name: Spaghetti Carbonara');
    expect(consoleLogSpy).toHaveBeenCalledWith('Category: Pasta');
    expect(consoleLogSpy).toHaveBeenCalledWith('Cuisine: Italian\n');
    expect(consoleLogSpy).toHaveBeenCalledWith('- 200g Pasta');
    expect(consoleLogSpy).toHaveBeenCalledWith('- 2 Eggs');
  });

  it('should handle missing fields with N/A', () => {
    const meal: Meal = {
      idMeal: '1',
    } as Meal;

    displayMealDetails(meal);

    expect(consoleLogSpy).toHaveBeenCalledWith('Name: N/A');
    expect(consoleLogSpy).toHaveBeenCalledWith('Category: N/A');
    expect(consoleLogSpy).toHaveBeenCalledWith('Cuisine: N/A\n');
  });
});