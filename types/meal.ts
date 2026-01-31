export interface Meal {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    [key: string]: string | undefined;
}

export interface Ingredient {
    ingredient: string;
    measure: string;
}