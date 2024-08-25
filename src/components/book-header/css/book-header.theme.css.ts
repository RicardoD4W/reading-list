import { CSSResult, CSSResultOrNative, css } from 'lit'

export class BookHeaderTheme {
  static cssBase: CSSResult = css`
    :host {
      display: block;
    }

    .header {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
    }

    .filters {
      display: flex;
      justify-content: space-around;
      gap: 20px;
    }

    h3 {
      display: flex;
      flex-direction: column;
    }

    h1 {
      text-align: center;
    }
  `

  static BookHeaderTheme: CSSResultOrNative[] = [BookHeaderTheme.cssBase]
}
