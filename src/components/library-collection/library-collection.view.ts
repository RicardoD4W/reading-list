import { CSSResultGroup, CSSResultOrNative, TemplateResult, html } from 'lit'
import { LibraryCollectionTheme } from './css/library-collection.theme.css'
import { LibraryCollectionViewModel } from './library-collection.viewmodel'
import { repeat } from 'lit/directives/repeat.js'

export class LibraryCollectionView extends LibraryCollectionViewModel {
  protected static finalizeStyles(
    styles?: CSSResultGroup | undefined
  ): CSSResultOrNative[] {
    return [...super.finalizeStyles(styles), LibraryCollectionTheme.cssBase]
  }

  public render(): TemplateResult {
    return html` <details open>
      <summary>
        ${this.webComponentId === 'COMMON'
          ? 'Desplegar disponibles'
          : 'Desplegar destacados'}
      </summary>

      <section class="gallery">
        ${repeat(
          this.library,
          ({ book }) => book.ISBN,
          ({ book }) =>
            html`<div
              class=${this.webComponentId}
              @click=${() => this.handleClickBook(book)}
            >
              <img class="book" src=${book.cover} />
            </div>`
        )}
      </section>
    </details>`
  }
}

window.customElements.define('library-collection', LibraryCollectionView)

declare global {
  interface HTMLElementTagNameMap {
    'library-collection': LibraryCollectionView
  }
}
