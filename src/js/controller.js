import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookMarksView from './views/bookMarksView';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SEC } from './config';

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

    // update bookmark on recipe rendering 
    bookMarksView.update(model.state.bookmarks)

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

const addBookmark = () => {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe)
  } else {
    model.removeBookmark(model.state.recipe.id)
  }

  // update recipe view
  recipeView.update(model.state.recipe)

  // render bookmarks in bookmark panel
  bookMarksView.render(model.state.bookmarks)
}

const controlBookmarks = () => {
  bookMarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async (recipe) => {
  try {
    addRecipeView.renderSpinner()

    // upload recipe data
    await model.uploadRecipe(recipe)

    // render recipe on page
    recipeView.render(model.state.recipe)

    // success message
    addRecipeView.renderMessage()

    // render bookmarks 
    controlBookmarks()

    // Change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`)

    setTimeout(() => {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000)
  } catch (error) {
    addRecipeView.renderError(error)
  }
}

const init = () => {
  recipeView.addHandlerRender(controlRecepies)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(addBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  bookMarksView.addHandlerRender(controlBookmarks)
  addRecipeView.addHandlerUpload(controlAddRecipe)
}

init()