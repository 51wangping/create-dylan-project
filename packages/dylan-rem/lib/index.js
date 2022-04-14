let DESIGN_WIDTH = 375;
let REM_BASE = 100;
let MAX_RATIO = 2;

let fontSize = 100;
let initFlag = false;

const handler = () => {
  fontSize = ((Math.min(window.innerWidth, MAX_RATIO * 375) / DESIGN_WIDTH) * REM_BASE).toFixed(1);

  document.documentElement.style.fontSize = fontSize + 'px';
};

window.addEventListener('resize', () => {
  if (!initFlag) return;
  handler();
});

const px2Rem = (px, addUnit = false) => {
  let value = px / REM_BASE;

  if (addUnit) {
    value += 'rem';
  }
  return value;
};

const rem2Px = (rem, addUnit = false) => {
  let value = REM_BASE * rem;

  if (addUnit) {
    value += 'px';
  }

  return value;
};

// maxRatio: 最大比例
const init = ({ designWidth = 375, rootValue = 100, maxRatio = 2 }) => {
  DESIGN_WIDTH = designWidth;
  REM_BASE = rootValue;
  MAX_RATIO = maxRatio;
  handler(rootValue);
  initFlag = true;
};

export default {
  init,
  px2Rem,
  rem2Px,
};
