import { LitElement, html } from 'lit'
import type { Book, Library } from './types/Book'
import { Task } from '@lit/task'
import './components/library-collection/library-collection.view'
import './components/book-header/book-header.view'
import { FilterNumPageEvent } from './components/book-header/events/filter-numpage.event'
import { FilterGengeEvent } from './components/book-header/events/filter-genre.event'
import { state } from 'lit/decorators.js'

export class MyApp extends LitElement {
  @state() private _booksTask!: Task<Book[]>
  private _minPages!: number
  private _maxPages!: number
  private _allGenres!: string[]
  private _originalLibrary: Book[] = []
  private _selectedGenre: string = 'Todos'
  private _minPagesFilter: number = 0

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

          <main>
            <library-collection .library=${library}></library-collection>
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
