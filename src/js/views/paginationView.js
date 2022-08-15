import View from './view'
import icons from './../../img/icons.svg'

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination')
    _errorMessage = 'Could not find any recipe with this id'
    _message = ''

    addHandlerClick = (handler) => {
        this._parentElement.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn--inline')

            if (!btn) return

            const goTo = Number(btn.dataset.goto)

            handler(goTo)
        })
    }

    _generateMarkup = () => {
        const currentPage = this._data.page
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)

        // page 1 and other pages
        if (currentPage === 1 && numPages > 1) {
            return this._renderNextPageBtn(currentPage + 1)
        }

        // last page
        if (currentPage === numPages && numPages > 1) {
            return this._renderPrevPageBtn(currentPage - 1)
        }

        // other pages
        if (currentPage < numPages) {
            return [this._renderNextPageBtn(currentPage + 1), this._renderPrevPageBtn(currentPage - 1)].join('')
        }

        // page 1 and no other
        return ''
    }

    _renderPrevPageBtn = (page) => {
        return `
            <button data-goto="${page}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${page}</span>
            </button>`
    }

    _renderNextPageBtn = (page) => {
        return `
            <button data-goto="${page}" class="btn--inline pagination__btn--next">
                <span>Page ${page}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        ` }


}

export default new PaginationView()