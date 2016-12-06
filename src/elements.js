/* global HTMLElement customElements */

import { patch } from 'incremental-dom';

const render = ({ message, time }) => (
  <p class="message">Message from submodule: {message} ({time})</p>
);

class XSubModule extends HTMLElement {
  constructor() {
    super();
    this.privates = {};
    this.privates.message = 'init';
    this.privates.time = '----';
    this.privates.ontap = () => {
      console.log('init ontap callback');
    };
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        .message { color: red }
      </style>
      <div id=root></div>
    `;
    this.privates.root = shadowRoot.querySelector('#root');
    this.privates.root.onclick = this.ontap;
    patch(this.privates.root, () => render(this.privates));
  }

  static get observedAttributes() {
    return ['message', 'time', 'ontap'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'message') {
      this.privates.message = newValue;
      patch(this.privates.root, () => render(this.privates));
    }
    if (attr === 'time') {
      this.privates.time = newValue;
      patch(this.privates.root, () => render(this.privates));
    }
    if (attr === 'ontap') {
      throw new Error(`Unexpected type ${typeof newValue} (1)`);
    }
  }

  get ontap() {
    return this.privates.ontap;
  }

  set ontap(newValue) {
    if (typeof newValue !== 'function') {
      throw new Error(`Unexpected type ${typeof newValue} (2)`);
    }
    this.privates.ontap = newValue;
    this.privates.root.onclick = this.ontap;
  }
}
customElements.define('x-sub-module', XSubModule);
