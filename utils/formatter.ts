import type { Meal, Ingredient } from "../types/meal";
import { getIngredients } from "../api/mealApi";

export function displayMealList(meals: Meal[]) {
    console.log("\nRecipes Found: \n");

    meals.forEach((meal) => {
        console.log(`${meal.idMeal} - ${meal.strMeal}`);
    });
}

export function displayMealDetails(meal: Meal) {
    console.log(`\nRecipe Details: \n`);
    console.log(`Name: ${meal.strMeal || "N/A"}`);
    console.log(`Category: ${meal.strCategory || "N/A"}`);
    console.log(`Cuisine: ${meal.strArea || "N/A"}\n`);
    
    const ingredients = getIngredients(meal);
    
    if (ingredients.length > 0) {
        console.log("Ingredients:\n");
        ingredients.forEach((item) => {
            const measure = item.measure ? `${item.measure} ` : "";
            console.log(`- ${measure}${item.ingredient}`);
        });
        console.log();
    } else {
        console.log("Ingredients: N/A\n");
    }
    
    console.log("Instructions:\n");
    console.log(meal.strInstructions || "No instructions available");
}