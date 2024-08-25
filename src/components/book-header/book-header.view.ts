import { CSSResultGroup, CSSResultOrNative, TemplateResult, html } from 'lit'
import { BookHeaderTheme } from './css/book-header.theme.css'
import { BookHeaderViewModel } from './book-header.viewmodel'

export class BookHeaderView extends BookHeaderViewModel {
  protected static finalizeStyles(
    styles?: CSSResultGroup | undefined
  ): CSSResultOrNative[] {
    return [...super.finalizeStyles(styles), BookHeaderTheme.cssBase]
  }

  public render(): TemplateResult {
    return html`
      <header class="header">
        <h1>${this.avaliblesBooks} libros disponibles</h1>
        <hgroup class="filters">
          <h3>
            <span>Número de páginas <small>(min)</small></span>
            <input
              type="range"
              min="0"
              max=${this.maxPages}
              value=${this.minPages}
              @input=${this.handleInputPageFilterChange}
            />
            ${this.filterPages}
          </h3>
          <h3>
            <span>Género</span>
            <select @input=${this.handleSelectGenreFilterChange}>
              <option value="Todos">Todos</option>
              ${this.genres.map(
                (genre) => html`<option value=${genre}>${genre}</option>`
              )}
            </select>
          </h3>
        </hgroup>
      </header>
    `
  }
}

window.customElements.define('book-header', BookHeaderView)

declare global {
  interface HTMLElementTagNameMap {
    'book-header': BookHeaderView
  }
}
