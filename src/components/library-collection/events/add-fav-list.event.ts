import { Book } from '../../../types/Book'

interface BookEventDetail extends Book {
  from: string
}

export class AddFavListEvent extends CustomEvent<BookEventDetail> {
  constructor(config: CustomEventInit<BookEventDetail> = {}) {
    super('add:fav-list', {
      ...config,
      bubbles: true,
      composed: true,
    })
  }
}
