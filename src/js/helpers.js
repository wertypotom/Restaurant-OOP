import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
}

// export const getJSON = async (url) => {
//     try {
//         const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//         const data = await res.json();

//         if (!res.ok) {
//             throw new Error(`${data.message} (${res.status})`);
//         }

//         return data
//     } catch (error) {
//         throw error
//     }
// }

export const createRecipeData = (data) => {
    const { recipe } = data.data;

    return {
        id: recipe.id,
        title: recipe.title,
        imageUrl: recipe.image_url,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        sourceUrl: recipe.source_url,
        servings: recipe.servings,
        publisher: recipe.publisher,
        ...(recipe.key && { key: recipe.key })
    };
}

export const AJAX = async (url, recipeData = undefined) => {
    try {
        const fetchURL = !!recipeData ? fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(recipeData)
        }) : fetch(url)

        const res = await Promise.race([fetchURL, timeout(TIMEOUT_SEC)]);

        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message} (${res.status})`);
        }

        return data
    } catch (error) {
        throw error
    }
}

// export const sendJSON = async (url, recipeData) => {
//     try {
//         const res = await Promise.race([fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'Application/json'
//             },
//             body: JSON.stringify(recipeData)
//         }), timeout(TIMEOUT_SEC)]);

//         const data = await res.json();

//         if (!res.ok) {
//             throw new Error(`${data.message} (${res.status})`);
//         }

//         return data
//     } catch (error) {
//         throw error
//     }
// }

