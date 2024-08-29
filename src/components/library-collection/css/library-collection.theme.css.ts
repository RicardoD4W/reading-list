import { CSSResult, CSSResultOrNative, css } from 'lit'

export class LibraryCollectionTheme {
  static cssBase: CSSResult = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 15px;
      text-align: center;
    }

    div {
      position: relative;
    }

    summary {
      padding: 20px;
    }

    section.gallery {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 15px;
    }

    div .book {
      display: block;
      border-radius: 2px;
      width: 175px;
      height: 200px;
      transition: opacity 0.25s ease;
    }

    div.COMMON::before {
      content: '+';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: rgba(255, 255, 255, 0);
      font-size: 3rem;
      transition: color 0.25s ease;
      pointer-events: none;
    }
    div.FAV::before {
      content: '-';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: rgba(255, 255, 255, 0);
      font-size: 3rem;
      transition: color 0.25s ease;
      pointer-events: none;
    }

    div:hover .book {
      opacity: 0.25;
    }

    div:hover::before {
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
  `

  static LibraryCollectionTheme: CSSResultOrNative[] = [
    LibraryCollectionTheme.cssBase,
  ]
}
