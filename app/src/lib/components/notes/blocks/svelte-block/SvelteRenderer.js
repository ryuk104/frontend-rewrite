export class SvelteRenderer {
	constructor(component, { element }) {
		this.component = component;
		this.dom = element;

		this.dom.classList.add('svelte-renderer');
		this.dom.classList.add('self-center');
		this.dom.classList.add('w-full');
	}

	updateProps(props) {
		this.component.$set(props);
	}

	destroy() {
		this.component.$destroy();
	}
}

export default SvelteRenderer;
