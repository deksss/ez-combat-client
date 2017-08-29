import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  body {
    font-family: Roboto, Helvetica, Arial, sans-serif;
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
`;
