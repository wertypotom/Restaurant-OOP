import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';


const controlRecepies = async () => {
  try {
    const id = window.location.hash.slice(1)

    if (!id) return

    recipeView.renderSpinner()

    await model.loadRecipe(id)

    recipeView.render(model.state.recipe)
  } catch (error) {
    recipeView.renderError()
  }
}

const controlSearchResults = async () => {
  try {
    // get Search query
    const query = searchView.getQuery()

    if (!query) return

    // get search results
    await model.loadSeatchResults(query)

    console.log(model.state.search.results)
  } catch (error) {

  }
}

controlSearchResults()

const init = () => {
  recipeView.addHandlerRender(controlRecepies)
  searchView.addHandlerSearch(controlSearchResults)
}

init()