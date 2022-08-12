export const state = {
    recipe: {},
};

export const loadRecipe = async id => {
    try {
        const res = await fetch(
            `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message} (${res.status})`);
        }

        const { recipe } = data.data;

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            imageUrl: recipe.image_url,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
            sourceUrl: recipe.source_url,
            servings: recipe.servings,
            publisher: recipe.publisher,
        };
    } catch (error) {
        alert(error);
    }
};
