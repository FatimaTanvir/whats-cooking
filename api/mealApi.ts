import type { Meal, Ingredient } from "../types/meal";

const BASE_URL = "http://www.themealdb.com/api/json/v1/1";

async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
    }
    return res.json();
}

function extractIngredients(meal: Meal): Ingredient[] {
    const ingredients: Ingredient[] = [];
    
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim()) {
            ingredients.push({
                ingredient: ingredient.trim(),
                measure: (measure || "").trim()
            });
        }
    }
    return ingredients;
}

export async function searchMeal(keyword: string): Promise<Meal[]> {
    const data = await fetchJson<{ meals: Meal[] | null }>(
        `${BASE_URL}/search.php?s=${keyword}`
    );
    return data.meals ?? [];
}

export async function getMealByID(id: string): Promise<Meal | null> {
    const url = `${BASE_URL}/lookup.php?i=${id}`;
    const data = await fetchJson<{ meals: Meal[] | null }>(url);
    const meal = data.meals?.[0] ?? null;
    return meal;
}

export function getIngredients(meal: Meal): Ingredient[] {
    return extractIngredients(meal);
}