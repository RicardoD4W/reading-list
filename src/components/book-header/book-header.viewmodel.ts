import { LitElement } from 'lit'
import { property, state } from 'lit/decorators.js'
import { FilterGengeEvent } from './events/filter-genre.event'
import { FilterNumPageEvent } from './events/filter-numpage.event'

export class BookHeaderViewModel extends LitElement {
  @property({ type: Number }) avaliblesBooks: number = 0
  @property({ type: Number }) minPages: number = 0
  @property({ type: Number }) maxPages: number = 0
  @property({ type: Array }) genres: string[] = []

  @state() filterPages!: number

  connectedCallback() {
    super.connectedCallback()
    this.filterPages = this.minPages
  }

  protected handleInputPageFilterChange(e: InputEvent) {
    const input = e.currentTarget! as HTMLInputElement
    this.filterPages = +input.value
    this.dispatchEvent(new FilterNumPageEvent({ detail: this.filterPages }))
  }

  protected handleSelectGenreFilterChange(e: InputEvent) {
    const input = e.currentTarget! as HTMLInputElement
    this.dispatchEvent(new FilterGengeEvent({ detail: input.value }))
  }
}
