import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

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
    resultsView.renderSpinner()
    // get Search query
    const query = searchView.getQuery()

    if (!query) return

    // get search results
    await model.loadSeatchResults(query)

    // render results
    resultsView.render(model.getSearhResulPage(1))

    // render pagination
    paginationView.render(model.state.search)
  } catch (error) {
    console.log(error)
  }
}

const controlPagination = (page) => {
  // render new results
  resultsView.render(model.getSearhResulPage(page))

  // render new pagination
  paginationView.render(model.state.search)
}


const init = () => {
  recipeView.addHandlerRender(controlRecepies)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
}

init()