import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: []
    }
};

export const loadRecipe = async id => {
    try {
        const data = await getJSON(`${API_URL}/${id}`)

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
        throw error
    }
};


export const loadSeatchResults = async (query) => {
    try {
        state.search.query = query
        const data = await getJSON(`${API_URL}?search=${query}`)

        const { recipes } = data.data

        state.search.results = recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                imageUrl: rec.image_url,
                publisher: rec.publisher,
            }
        })
    } catch (error) {
        throw error
    }
}
