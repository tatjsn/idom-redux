/* global HTMLElement customElements */

const render = message => `Message from submodule: ${message}`;

class XSubModule extends HTMLElement {
  constructor() {
    super();
    this._message = 'init';
    this._ontap = () => {
      console.log('init ontap callback');
    };
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        .message { color: red }
      </style>
      <div id=root class=message>${render(this.__message)}</div>
    `;
    this._root = shadowRoot.querySelector('#root');
    this._root.onclick = this.ontap;
  }

  static get observedAttributes() {
    return ['message', 'ontap'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'message') {
      this._message = newValue;
      this._root.innerHTML = render(this._message);
    }
    if (attr === 'ontap') {
      throw new Error(`Unexpected type ${typeof newValue} (1)`);
    }
  }

  get message() {
    return this._message;
  }

  set message(newValue) {
    this._message = newValue;
    this._root.innerHTML = render(this._message);
  }

  get ontap() {
    return this._ontap;
  }

  set ontap(newValue) {
    if (typeof newValue !== 'function') {
      throw new Error(`Unexpected type ${typeof newValue} (2)`);
    }
    this._ontap = newValue;
    this._root.onclick = this.ontap;
  }
}
customElements.define('x-sub-module', XSubModule);
