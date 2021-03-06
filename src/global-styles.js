import { injectGlobal } from "styled-components";

/* eslint no-unused-expressions: 0 */
injectGlobal`

  html {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      height: 100%;
  }
  body {
      margin: 0;
      font-family: Roboto, Helvetica, Arial, sans-serif;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
  }

  body {
   margin: 0;
  }

  body.fontLoaded {
    font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #root {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Roboto, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  span {
    font-family: Roboto, Helvetica, Arial, sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  p,
  div,
  blockquote,
  figure,
  ol,
  ul {
      margin: 0;
      padding: 0;
      font-family: Roboto, Helvetica, Arial, sans-serif;
  }



  div::-webkit-scrollbar {
      width: 8px;
      height: 8px;
  }

  div::-webkit-scrollbar-track {
      border-radius: 10px;
      background: #eee;
  }

  div::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #888;
  }


`;
