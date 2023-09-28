class Tag extends HTMLElement {
  connectedCallback() {
    this.textContent = `<${this.textContent}>`;
  }
}
customElements.define('x-tag', Tag);

export default Tag;
