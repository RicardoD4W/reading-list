import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import type { Book } from '../../types/Book'

export class LibraryCollectionViewModel extends LitElement {
  @property({ type: Array }) library!: Book[]
}
