import View from './view'
import icons from './../../img/icons.svg'
import recipePreviewView from './recipePreviewView'

class ResultsView extends View {
    _parentElement = document.querySelector('.results')
    _errorMessage = 'No recepies found for your query'
    _message = ''

    _generateMarkup() {
        return this._data
            .map(result => recipePreviewView.render(result, false))
            .join('')
    }
}

export default new ResultsView()