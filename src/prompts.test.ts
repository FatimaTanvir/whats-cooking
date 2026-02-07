import { describe, it, expect, vi, beforeEach } from 'vitest';
import { askForKeyword, askForMealId } from './prompts';
import inquirer from 'inquirer';

// Mock the entire inquirer module
vi.mock('inquirer');

describe('askForKeyword', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the keyword entered by user', async () => {
    // Mock inquirer.prompt to return a specific value
    (inquirer.prompt as any).mockResolvedValueOnce({ keyword: 'pasta' });

    const result = await askForKeyword();

    expect(result).toBe('pasta');
    expect(inquirer.prompt).toHaveBeenCalledWith([
      {
        type: 'input',
        name: 'keyword',
        message: 'Search a recipe by a keyword: '
      }
    ]);
  });
});

describe('askForMealId', () => {
  it('should return the ID entered by user', async () => {
    (inquirer.prompt as any).mockResolvedValueOnce({ id: '52772' });

    const result = await askForMealId();

    expect(result).toBe('52772');
  });
});