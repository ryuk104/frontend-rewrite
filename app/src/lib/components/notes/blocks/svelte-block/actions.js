export const editable = (node) => {
  node.setAttribute("data-node-view-content", "");
  node.style.whiteSpace = "pre-wrap";
};

export const draggable = (node) => {
  node.setAttribute("data-drag-handle", "");
};

export const doNothingAction = () => {
  /* do nothing */
};
