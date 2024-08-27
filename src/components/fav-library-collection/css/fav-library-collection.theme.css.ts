import { CSSResult, CSSResultOrNative, css } from 'lit'

export class FavLibraryCollectionTheme {
  static cssBase: CSSResult = css`
    :host {
      display: block;
    }

    .container {
      display: flex;
      justify-content: center;
      justify-items: center;
      position: relative;
    }

    .main-title {
      position: absolute;
      top: -35px;
      padding: 0;
      margin: 0;
    }
  `

  static FavLibraryCollectionTheme: CSSResultOrNative[] = [
    FavLibraryCollectionTheme.cssBase,
  ]
}
