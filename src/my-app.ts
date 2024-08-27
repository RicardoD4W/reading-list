import { LitElement, css, html } from 'lit'
import type { Book, Library } from './types/Book'
import { Task } from '@lit/task'
import './components/library-collection/library-collection.view'
import './components/book-header/book-header.view'
import './components/fav-library-collection/fav-library-collection.view'
import { FilterNumPageEvent } from './components/book-header/events/filter-numpage.event'
import { FilterGengeEvent } from './components/book-header/events/filter-genre.event'
import { state } from 'lit/decorators.js'
import { AddFavListEvent } from './components/library-collection/events/add-fav-list.event'

export class MyApp extends LitElement {
  @state() private _booksTask!: Task<Book[]>
  @state() private _favBooks: Book[] = []
  private _minPages!: number
  private _maxPages!: number
  private _allGenres!: string[]
  private _originalLibrary: Book[] = []
  private _selectedGenre: string = 'Todos'
  private _minPagesFilter: number = 0

  static styles = css`
    .main-content {
      display: flex;
      justify-content: center;
      flex-direction: row;
    }

    .main-content library-collection {
      width: 50%;
    }
    .main-content fav-library-collection {
      width: 50%;
    }

    @media (max-width: 1250px) {
      .main-content {
        flex-direction: column;
        justify-content: center;
        gap: 50px;
      }
      .main-content library-collection {
        width: 100%;
      }
      .main-content fav-library-collection {
        width: 100%;
      }
    }
  `

  render() {
    return html`
      ${this._booksTask.render({
        pending: () => html`Cargando...`,
        complete: ({ library }) => html`
          <header
            @filter:range-event=${this._filterRange}
            @filter:numpage-event=${this._filterNumPage}
          >
            <book-header
              .avaliblesBooks=${library.length}
              .minPages=${this._minPages}
              .maxPages=${this._maxPages}
              .genres=${this._allGenres}
            ></book-header>
          </header>

          <main
            class="main-content"
            @add:fav-list=${(e: AddFavListEvent) => this._addBookToFavList(e)}
          >
            <library-collection .library=${library}></library-collection>
            <fav-library-collection
              .library=${this._favBooks}
            ></fav-library-collection>
          </main>
        `,
        error: (e) => html`Error: ${e}`,
      })}
    `
  }

  connectedCallback() {
    super.connectedCallback()

    this._booksTask = new Task(this, {
      task: async () => {
        const res = await fetch(`/data/books.json`)
        if (!res.ok) {
          throw new Error(res.status.toString())
        }
        const response = (await res.json()) as Library
        this._originalLibrary = response.library
        this._getPages(response.library)
        this._getGenres(response.library)

        return response
      },
      args: () => [],
    })
  }

  private _addBookToFavList(e: AddFavListEvent) {
    const { book } = e.detail
    const { from } = e.detail

    let collection = this._booksTask.value as Library

    if (from === 'FAV') {
      this._favBooks = [
        ...this._favBooks.filter((b) => b.book.ISBN !== book.ISBN),
      ]
      collection.library = [...collection.library, { book }]
    }

    if (from === 'COMMON') {
      collection.library = [
        ...collection.library.filter((b) => b.book.ISBN !== book.ISBN),
      ]
      this._favBooks = [...this._favBooks, { book }]
    }

    this._saveState()
    this.requestUpdate()
  }

  private _saveState() {
    console.log(this._booksTask, this._favBooks)
  }

  private _getPages(library: Book[]) {
    const numPages = library.map(({ book }) => book.pages)
    this._minPages = Math.min(...numPages)
    this._maxPages = Math.max(...numPages)
  }

  private _getGenres(library: Book[]) {
    const allGenres = new Set([...library.map(({ book }) => book.genre)])
    this._allGenres = [...allGenres]
  }

  private _filterNumPage(e: FilterNumPageEvent) {
    this._minPagesFilter = e.detail
    this._applyFilters()
  }

  private _filterRange(e: FilterGengeEvent) {
    this._selectedGenre = e.detail
    this._applyFilters()
  }

  private _applyFilters() {
    let filteredLibrary = [...this._originalLibrary]

    if (this._selectedGenre !== 'Todos') {
      filteredLibrary = filteredLibrary.filter(
        ({ book }) => book.genre === this._selectedGenre
      )
    }

    if (this._minPagesFilter > 0) {
      filteredLibrary = filteredLibrary.filter(
        ({ book }) => book.pages >= this._minPagesFilter
      )
    }

    let collection = this._booksTask.value as Library
    collection.library = filteredLibrary
    this.requestUpdate()
  }
}
window.customElements.define('my-app', MyApp)

declare global {
  interface HTMLElementTagNameMap {
    'my-app': MyApp
  }
}
