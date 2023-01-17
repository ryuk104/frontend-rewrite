import { dev } from "$app/environment";

// const FETCH_URL = dev ? "http://127.0.0.1:8787" : "";
const FETCH_URL = dev ? "https://dev.dashingos.com" : "";

export function uuid() {
  var IDX = 256,
    HEX = [],
    BUFFER;

  while (IDX--) HEX[IDX] = (IDX + 256).toString(16).substring(1);

  var i = 0,
    num,
    out = "";

  if (!BUFFER || IDX + 16 > 256) {
    BUFFER = Array((i = 256));
    while (i--) BUFFER[i] = (256 * Math.random()) | 0;
    i = IDX = 0;
  }

  for (; i < 16; i++) {
    num = BUFFER[IDX + i];
    if (i == 6) out += HEX[(num & 15) | 64];
    else if (i == 8) out += HEX[(num & 63) | 128];
    else out += HEX[num];
  }

  IDX++;
  return out;
}

export function click_outside(node) {
  const handleClick = (event) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent("outclick", node));
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
}

export const debounce = (cb, wait = 3000) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      cb.apply(null, args);
    }, wait);
  };
};

