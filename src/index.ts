import { askForKeyword, askForMealId } from "./prompts.js";
import { searchMeal, getMealByID } from "../api/mealApi.js";
import {
  displayMealList,
  displayMealDetails,
} from "../utils/formatter.js";

async function main() {
  const keyword = await askForKeyword();

  const meals = await searchMeal(keyword);

  if (meals.length === 0) {
    console.log("No recipes found.");
    return;
  }

  displayMealList(meals);

  const id = await askForMealId();
  const meal = await getMealByID(id);

  if (!meal) {
    console.log("Invalid recipe ID.");
    return;
  }

  displayMealDetails(meal);
}

main();
