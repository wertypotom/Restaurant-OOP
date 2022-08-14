class SearchView {
    #parentElement = document.querySelector('.search')

    getQuery = () => {
        const query = this.#parentElement.querySelector('.search__field').value

        this.#clearInput()

        return query
    }

    #clearInput = () => {
        this.#parentElement.querySelector('.search__field').value = ''
    }

    addHandlerSearch = (hadlerFunction) => {
        this.#parentElement.addEventListener('submit', (e) => {
            e.preventDefault()
            hadlerFunction()
        })
    }
}

export default new SearchView()