import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { Book } from '../../types/Book'

export class FavLibraryCollectionViewModel extends LitElement {
  @property({ type: Array }) library!: Book[]

  protected readonly _webComponentId = 'FAV'
}
