/* global HTMLElement customElements CustomEvent csjs */

import { patch } from 'incremental-dom';

class XSubModule extends HTMLElement {
  constructor() {
    super();
    this.locals = {
      connected: false,
      shadowRoot: this.attachShadow({ mode: 'closed' }),
    };
    this.onclick = () => {
      const tapEvent = new CustomEvent('tap');
      this.dispatchEvent(tapEvent);
    };
  }

  updateShadow() {
    if (!this.locals.connected) return;

    patch(this.locals.shadowRoot, ({ message, time }) => (
      <div>
        <style>
          {`
            .message { color: red }
          `}
        </style>
        <div>
          <p class="message">Message fromx submodule: {message} ({time})</p>
          <p>Boring static text 1</p>
          <p>Boring static text 2</p>
        </div>
      </div>
    ), this.locals);
  }

  connectedCallback() {
    this.locals.connected = true;
  }

  disconnectedCallback() {
    this.locals.connected = false;
  }

  static get observedAttributes() {
    return ['message', 'time'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    this.locals[attr] = newValue;
    this.updateShadow();
  }

  get ontap() {
    return this.locals.ontap;
  }

  set ontap(newValue) {
    this.removeEventListener('tap', this.locals.ontap);
    this.locals.ontap = newValue;
    this.addEventListener('tap', this.locals.ontap);
  }
}

customElements.define('x-sub-module', XSubModule);
