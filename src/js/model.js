import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RES_PER_PAGE,
        page: 1
    },
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

export const getSearhResulPage = (page = state.search.page) => {
    state.search.page = page

    const start = (page - 1) * state.search.resultsPerPage
    const end = (page * state.search.resultsPerPage)

    return state.search.results.slice(start, end)
}