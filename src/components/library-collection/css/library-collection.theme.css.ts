import { CSSResult, CSSResultOrNative, css } from 'lit'

export class LibraryCollectionTheme {
  static cssBase: CSSResult = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 15px;
    }

    .book {
      border-radius: 2px;
      width: 175px;
      height: 200px;
    }
  `

  static LibraryCollectionTheme: CSSResultOrNative[] = [
    LibraryCollectionTheme.cssBase,
  ]
}
