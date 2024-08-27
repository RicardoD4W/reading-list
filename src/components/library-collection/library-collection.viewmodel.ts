import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import type { Book, BookInfo } from '../../types/Book'
import { AddFavListEvent } from './events/add-fav-list.event'

export class LibraryCollectionViewModel extends LitElement {
  @property({ type: Array }) library!: Book[]
  @property({ type: String }) webComponentId: string = 'COMMON'

  handleClickBook(book: BookInfo) {
    this.dispatchEvent(
      new AddFavListEvent({ detail: { book, from: this.webComponentId } })
    )
  }
}
