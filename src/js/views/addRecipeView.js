import View from './view'

class AddRecipeView extends View {
    _message = 'Recipe was successfully updloaded'
    _parentElement = document.querySelector('.upload')

    _window = document.querySelector('.add-recipe-window')
    _overlay = document.querySelector('.overlay')
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')

    constructor() {
        super()
        this._addHandlerShowModal()
        this._addHandlerHideModal()
    }

    _addHandlerShowModal = () => {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
    }

    _addHandlerHideModal = () => {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
        this._overlay.addEventListener('click', this.toggleWindow.bind(this))
    }

    toggleWindow = () => {
        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }

    addHandlerUpload = (handler) => {
        this._parentElement.addEventListener('submit', e => {
            e.preventDefault()

            const dataArr = [...new FormData(this._parentElement)]

            const data = Object.fromEntries(dataArr)

            handler(data)
        })
    }
}

export default new AddRecipeView()