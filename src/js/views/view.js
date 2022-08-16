import icons from './../../img/icons.svg'

export default class View {
    _data

    render = (data, render = true) => {
        if (!data || (Array.isArray(data) && !data.length)) return this.renderError()

        this._data = data

        const markup = this._generateMarkup()

        if (!render) return markup;

        this._clear()

        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    update = (data) => {
        this._data = data

        // generate markup to compare old and new version of html
        const newMarkup = this._generateMarkup()
        const newDOM = document.createRange().createContextualFragment(newMarkup)

        const currentElements = Array.from(this._parentElement.querySelectorAll('*'))
        const newElements = Array.from(newDOM.querySelectorAll("*"))

        // changing current DOM elements
        newElements.forEach((newEl, i) => {
            const currentEl = currentElements[i]

            // update changed text
            if (!newEl.isEqualNode(currentEl) && newEl.firstChild?.nodeValue.trim() !== '') {
                currentEl.textContent = newEl.textContent
            }

            // update changed attributes
            if (!newEl.isEqualNode(currentEl)) {
                const attributes = Array.from(newEl.attributes)

                attributes.forEach(attr => {
                    currentEl.setAttribute(attr.name, attr.value)
                })
            }
        })
    }

    _clear = () => {
        this._parentElement.innerHTML = ''
    }

    renderSpinner = () => {
        const markUp = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `

        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markUp)
    }

    renderError = (message = this._errorMessage) => {
        const markUp = `
            <div class="error">
                <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>
        `

        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markUp)
    }

    renderMessage = (message = this._message) => {
        const markUp = `
            <div class="message">
                <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>
        `

        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markUp)
    }
}