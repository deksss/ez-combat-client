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
    height: 100vh;
    min-width: 100%;
  }

  p,
  label {
    font-family: Hammersmith One, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  span {
    font-family: Hammersmith One, Roboto, Helvetica, Arial, sans-serif;
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
      font-family: Hammersmith One, Roboto, Helvetica, Arial, sans-serif;
  }

  @keyframes roll {
    10% {
      transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
    30% {
      transform: rotateX(120deg) rotateY(240deg) rotateZ(0deg) translateX(40px) translateY(40px);
    }
    50% {
      transform: rotateX(240deg) rotateY(480deg) rotateZ(0deg) translateX(-40px) translateY(-40px);
    }
    70% {
      transform: rotateX(360deg) rotateY(720deg) rotateZ(0deg);
    }
    90% {
      transform: rotateX(480deg) rotateY(960deg) rotateZ(0deg);
    }
  }
  .content {
    margin: auto auto;
    position: relative;
    width: 80px;
    height: 80px;
    perspective: 1500px;
  }

  .die {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.5s ease-out;
    cursor: pointer;
    transform: rotateX(-53deg);
  }
  .die.rolling {
    animation: roll 3s linear;
  }
  .die[data-face="1"] {
    transform: rotateX(-53deg) rotateY(0deg);
  }
  .die[data-face="2"] {
    transform: rotateX(-53deg) rotateY(72deg);
  }
  .die[data-face="3"] {
    transform: rotateX(-53deg) rotateY(144deg);
  }
  .die[data-face="4"] {
    transform: rotateX(-53deg) rotateY(216deg);
  }
  .die[data-face="5"] {
    transform: rotateX(-53deg) rotateY(288deg);
  }
  .die[data-face="16"] {
    transform: rotateX(127deg) rotateY(-72deg);
  }
  .die[data-face="17"] {
    transform: rotateX(127deg) rotateY(-144deg);
  }
  .die[data-face="18"] {
    transform: rotateX(127deg) rotateY(-216deg);
  }
  .die[data-face="19"] {
    transform: rotateX(127deg) rotateY(-288deg);
  }
  .die[data-face="20"] {
    transform: rotateX(127deg) rotateY(-360deg);
  }
  .die[data-face="6"] {
    transform: rotateX(11deg) rotateZ(180deg) rotateY(0deg);
  }
  .die[data-face="7"] {
    transform: rotateX(11deg) rotateZ(180deg) rotateY(72deg);
  }
  .die[data-face="8"] {
    transform: rotateX(11deg) rotateZ(180deg) rotateY(144deg);
  }
  .die[data-face="9"] {
    transform: rotateX(11deg) rotateZ(180deg) rotateY(216deg);
  }
  .die[data-face="10"] {
    transform: rotateX(11deg) rotateZ(180deg) rotateY(288deg);
  }
  .die[data-face="11"] {
    transform: rotateX(11deg) rotateY(-252deg);
  }
  .die[data-face="12"] {
    transform: rotateX(11deg) rotateY(-324deg);
  }
  .die[data-face="13"] {
    transform: rotateX(11deg) rotateY(-396deg);
  }
  .die[data-face="14"] {
    transform: rotateX(11deg) rotateY(-468deg);
  }
  .die[data-face="15"] {
    transform: rotateX(11deg) rotateY(-540deg);
  }
  .die .face {
    position: absolute;
    left: 50%;
    top: 0;
    margin: 0 -20px;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 34.4px solid rgba(30, 180, 20, 0.75);
    width: 0px;
    height: 0px;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    counter-increment: steps 1;
  }
  .die .face:before {
    content: counter(steps);
    position: absolute;
    top: 8.6px;
    left: -40px;
    color: #fff;
    text-shadow: 1px 1px 3px #000;
    font-size: 17.2px;
    text-align: center;
    line-height: 30.96px;
    width: 80px;
    height: 34.4px;
  }
  .die .face:nth-child(1) {
    transform: rotateY(0deg) translateZ(13.4px) translateY(-5.16px) rotateX(53deg);
  }
  .die .face:nth-child(2) {
    transform: rotateY(-72deg) translateZ(13.4px) translateY(-5.16px) rotateX(53deg);
  }
  .die .face:nth-child(3) {
    transform: rotateY(-144deg) translateZ(13.4px) translateY(-5.16px) rotateX(53deg);
  }
  .die .face:nth-child(4) {
    transform: rotateY(-216deg) translateZ(13.4px) translateY(-5.16px) rotateX(53deg);
  }
  .die .face:nth-child(5) {
    transform: rotateY(-288deg) translateZ(13.4px) translateY(-5.16px) rotateX(53deg);
  }
  .die .face:nth-child(16) {
    transform: rotateY(-108deg) translateZ(13.4px) translateY(48.504px) rotateZ(180deg) rotateX(53deg);
  }
  .die .face:nth-child(17) {
    transform: rotateY(-36deg) translateZ(13.4px) translateY(48.504px) rotateZ(180deg) rotateX(53deg);
  }
  .die .face:nth-child(18) {
    transform: rotateY(36deg) translateZ(13.4px) translateY(48.504px) rotateZ(180deg) rotateX(53deg);
  }
  .die .face:nth-child(19) {
    transform: rotateY(108deg) translateZ(13.4px) translateY(48.504px) rotateZ(180deg) rotateX(53deg);
  }
  .die .face:nth-child(20) {
    transform: rotateY(180deg) translateZ(13.4px) translateY(48.504px) rotateZ(180deg) rotateX(53deg);
  }
  .die .face:nth-child(6) {
    transform: rotateY(360deg) translateZ(30px) translateY(21.672px) rotateZ(180deg) rotateX(-11deg);
  }
  .die .face:nth-child(7) {
    transform: rotateY(288deg) translateZ(30px) translateY(21.672px) rotateZ(180deg) rotateX(-11deg);
  }
  .die .face:nth-child(8) {
    transform: rotateY(216deg) translateZ(30px) translateY(21.672px) rotateZ(180deg) rotateX(-11deg);
  }
  .die .face:nth-child(9) {
    transform: rotateY(144deg) translateZ(30px) translateY(21.672px) rotateZ(180deg) rotateX(-11deg);
  }
  .die .face:nth-child(10) {
    transform: rotateY(72deg) translateZ(30px) translateY(21.672px) rotateZ(180deg) rotateX(-11deg);
  }
  .die .face:nth-child(11) {
    transform: rotateY(252deg) translateZ(30px) translateY(21.672px) rotateX(-11deg);
  }
  .die .face:nth-child(12) {
    transform: rotateY(324deg) translateZ(30px) translateY(21.672px) rotateX(-11deg);
  }
  .die .face:nth-child(13) {
    transform: rotateY(396deg) translateZ(30px) translateY(21.672px) rotateX(-11deg);
  }
  .die .face:nth-child(14) {
    transform: rotateY(468deg) translateZ(30px) translateY(21.672px) rotateX(-11deg);
  }
  .die .face:nth-child(15) {
    transform: rotateY(540deg) translateZ(30px) translateY(21.672px) rotateX(-11deg);
  }




`;
