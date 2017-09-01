import { injectGlobal } from "styled-components";

/* eslint no-unused-expressions: 0 */
injectGlobal`

  html {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
  }
  body {
      margin: 0;
      font-family: Hammersmith One, Roboto, Helvetica, Arial, sans-serif;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
  }

  body {

  }

  body.fontLoaded {
    font-family: Hammersmith One, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #root {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Hammersmith One, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  h1,
  h2,
  h3,
  h4,
  p,
  blockquote,
  figure,
  ol,
  ul {
      margin: 0;
      padding: 0;
  }
`;
