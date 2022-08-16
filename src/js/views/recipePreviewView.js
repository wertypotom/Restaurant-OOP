import View from './view'
import icons from './../../img/icons.svg'

class RecipePreviewView extends View {
    _parentElement = ''

    _generateMarkup = () => {
        const id = window.location.hash.slice(1)

        return `
            <li class="preview">
                <a class="preview__link ${this._data.id === id ? 'preview__link--active' : ''}" href="#${this._data.id}">
                    <figure class="preview__fig">
                        <img src="${this._data.imageUrl}" alt="Test" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${this._data.title}</h4>
                        <p class="preview__publisher">${this._data.publisher}</p>
                    </div>
                </a>
            </li>
        `
    }
}

export default new RecipePreviewView()