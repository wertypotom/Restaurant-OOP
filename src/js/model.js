import { API_KEY, API_URL, RES_PER_PAGE } from './config';
import { createRecipeData, AJAX } from './helpers';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RES_PER_PAGE,
        page: 1
    },
    bookmarks: []
};

export const loadRecipe = async id => {
    try {
        const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`)
        state.recipe = createRecipeData(data)


        // check if recipe is already in bookmarks
        if (state.bookmarks.some(recipe => recipe.id === id)) {
            state.recipe.bookmarked = true
        } else {
            state.recipe.bookmarked = false
        }
    } catch (error) {
        throw error
    }
};


export const loadSeatchResults = async (query) => {
    try {
        state.search.query = query
        const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`)

        const { recipes } = data.data

        state.search.results = recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                imageUrl: rec.image_url,
                publisher: rec.publisher,
                ...(rec.key && { key: rec.key })
            }
        })
        state.search.page = 1
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

export const updateServings = (servingsNum) => {
    state.recipe.ingredients.forEach(ingredient => {
        ingredient.quantity = ingredient.quantity * servingsNum / state.recipe.servings

        // newQuant = oldQt * newServings / oldServings
    })

    state.recipe.servings = servingsNum
}

const presistBookmarks = () => {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

export const addBookmark = (recipe) => {
    state.bookmarks.push(recipe)

    // mark current recipe as bookmarked
    if (recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true
    }

    presistBookmarks()
}

export const removeBookmark = (recipeId) => {
    const index = state.bookmarks.findIndex(b => b.id === recipeId)

    state.bookmarks.splice(index, 1)

    // unmark current recipe
    if (recipeId === state.recipe.id) {
        state.recipe.bookmarked = false
    }

    presistBookmarks()
}

export const uploadRecipe = async (recipe) => {
    try {
        const ingArr = Object.entries(recipe)
            .filter(entry => {
                return entry[0].startsWith('ingredient') && !!entry[1]
            })
            .map(ing => {
                const ingArray = ing[1].split(',').map(el => el.trim())

                if (ingArray.length < 3) {
                    throw new Error('Wrong ingredient format. Please use correct format')
                }

                const [quantity, unit, description] = ingArray

                return { quantity: quantity ? +quantity : null, unit, description }
            })

        const newRecipe = {
            title: recipe.title,
            source_url: recipe.sourceUrl,
            image_url: recipe.image,
            publisher: recipe.publisher,
            cooking_time: +recipe.cookingTime,
            servings: +recipe.servings,
            ingredients: ingArr
        }

        const data = await AJAX(`${API_URL}?key=${API_KEY}`, newRecipe)
        state.recipe = createRecipeData(data)
        addBookmark(state.recipe)
    } catch (error) {
        throw (error)
    }

}


const init = () => {
    const data = localStorage.getItem('bookmarks')

    if (data) {
        state.bookmarks = JSON.parse(data)
    }
}

init()

const clearBookmarks = () => {
    localStorage.clear('bookmarks')
}