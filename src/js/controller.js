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

    // update results to mark selected
    resultsView.update(model.getSearhResulPage())

    // render spinner on recipe loading
    recipeView.renderSpinner()

    // load recipes
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
    resultsView.render(model.getSearhResulPage())

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

const controlServings = (newServings) => {
  // update servings
  model.updateServings(newServings)

  // update recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const init = () => {
  recipeView.addHandlerRender(controlRecepies)
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
}

init()