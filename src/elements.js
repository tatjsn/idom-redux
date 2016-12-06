/* global HTMLElement customElements */

const render = message => `Message from submodule: ${message}`;

class XSubModule extends HTMLElement {
  constructor() {
    super();
    this._message = 'init';
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        .message { color: red }
      </style>
      <div id=root class=message>${render(this.__message)}</div>
    `;
    this._root = shadowRoot.querySelector('#root');
  }

  static get observedAttributes() {
    return ['message'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'message') {
      this._message = newValue;
      this._root.innerHTML = render(this._message);
    }
  }

  get message() {
    return this._message;
  }

  set message(value) {
    this._message = value;
    this._root.innerHTML = render(this._message);
  }
}
customElements.define('x-sub-module', XSubModule);
