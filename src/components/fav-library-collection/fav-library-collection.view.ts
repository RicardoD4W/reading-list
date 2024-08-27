import { CSSResultGroup, CSSResultOrNative, TemplateResult, html } from 'lit'
import { FavLibraryCollectionTheme } from './css/fav-library-collection.theme.css'
import { FavLibraryCollectionViewModel } from './fav-library-collection.viewmodel'
import '../library-collection/library-collection.view'

export class FavLibraryCollectionView extends FavLibraryCollectionViewModel {
  protected static finalizeStyles(
    styles?: CSSResultGroup | undefined
  ): CSSResultOrNative[] {
    return [...super.finalizeStyles(styles), FavLibraryCollectionTheme.cssBase]
  }

  public render(): TemplateResult {
    return html`
      <section class="container">
        <h2 class="main-title">Tus Destacados</h2>
        <library-collection
          .webComponentId=${this._webComponentId}
          .library=${this.library}
        ></library-collection>
      </section>
    `
  }
}

window.customElements.define('fav-library-collection', FavLibraryCollectionView)

declare global {
  interface HTMLElementTagNameMap {
    'fav-library-collection': FavLibraryCollectionView
  }
}
