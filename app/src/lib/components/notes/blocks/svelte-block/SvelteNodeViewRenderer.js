import { setContext } from "svelte";
import { NodeView } from "@tiptap/core";
import { SvelteRenderer } from "./SvelteRenderer";

class SvelteNodeView extends NodeView {
  mount() {
    const Component = this.component;

    const props = {
      editor: this.editor,
      node: this.node,
      decorations: this.decorations,
      selected: false,
      extension: this.extension,
      getPos: () => this.getPos(),
      updateAttributes: (attributes = {}) => this.updateAttributes(attributes),
      deleteNode: () => this.deleteNode(),
    };

    this.contentDOMElement = this.node.isLeaf
      ? null
      : document.createElement("div");

    if (this.contentDOMElement) {
      // For some reason the whiteSpace prop is not inherited properly in Chrome and Safari
      // With this fix it seems to work fine
      // See: https://github.com/ueberdosis/tiptap/issues/1197
      this.contentDOMElement.style.whiteSpace = "inherit";
    }

    const target = document.createElement(this.node.isInline ? "span" : "div");

    const svelteComponent = new Component({
      target,
      props,
    });

    this.renderer = new SvelteRenderer(svelteComponent, {
      element: target,
    });
  }

  get dom() {
    return this.renderer.dom;
  }

  get contentDOM() {
    if (this.node.isLeaf) {
      return null;
    }

    this.maybeMoveContentDOM();

    return this.contentDOMElement;
  }

  maybeMoveContentDOM() {
    const contentElement = this.dom.querySelector("[data-node-view-content]");

    if (
      this.contentDOMElement &&
      contentElement &&
      !contentElement.contains(this.contentDOMElement)
    ) {
      contentElement.appendChild(this.contentDOMElement);
    }
  }

  update(node, decorations) {
    if (typeof this.options.update === "function") {
      return this.options.update(node, decorations);
    }

    if (node.type !== this.node.type) {
      return false;
    }

    if (node === this.node && this.decorations === decorations) {
      return true;
    }

    this.node = node;
    this.decorations = decorations;
    this.renderer.updateProps({ node, decorations });
    this.maybeMoveContentDOM();

    return true;
  }

  selectNode() {
    this.renderer.updateProps({ selected: true });
  }

  deselectNode() {
    this.renderer.updateProps({ selected: false });
  }

  destroy() {
    this.renderer.destroy();
    this.contentDOMElement = null;
  }
}

export const SvelteNodeViewRenderer = (component, options) => {
  return (props) => new SvelteNodeView(component, props, options);
};
