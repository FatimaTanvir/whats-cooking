import inquirer from "inquirer"; //package

export async function askForKeyword(): Promise<string> {
    const {keyword} = await inquirer.prompt([
        {
            type: "input",
            name: "keyword",
            message: "Search a recipe by a keyword: ",
        },
    ]);
    return keyword;
}

export async function askForMealId(): Promise<string> {
    const {id} = await inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Enter a recipe ID to view more details about the recipe: ",
        },
    ]);
    return id;
}