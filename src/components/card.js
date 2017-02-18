/* global HTMLElement customElements CustomEvent csjs */
import { patch } from 'incremental-dom';

class Card extends HTMLElement {
  constructor() {
    super();
    this.locals = {
      shadowRoot: this.attachShadow({ mode: 'closed' }),
      dispatchCardSelect: this.dispatchCardSelect.bind(this),
    };
  }

  dispatchCardSelect() {
    const cardselectEvent = new CustomEvent('cardselect');
    this.dispatchEvent(cardselectEvent);
  }

  updateShadow() {
    patch(this.locals.shadowRoot, ({ title, dispatchCardSelect }) => (
      <div>
        <style>{`
          @import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css');
        `}</style>
        <div class="card">
          <img class="card-img-top" src="https://dummyimage.com/300x200/000/fff.png" alt="Caption" />
          <div class="card-block">
            <h4 class="card-title">{title}</h4>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button class="btn btn-primary" onclick={dispatchCardSelect}>Select</button>
          </div>
        </div>
      </div>
    ), this.locals);
  }

  static get observedAttributes() {
    return ['title'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    this.locals[attr] = newValue;
    this.updateShadow();
  }

  connectedCallback() {
    this.updateShadow();
  }

  get oncardselect() {
    return this.locals.oncardselect;
  }

  set oncardselect(newValue) {
    this.removeEventListener('cardselect', this.locals.oncardselect);
    this.locals.oncardselect = newValue;
    this.addEventListener('cardselect', this.locals.oncardselect);
  }
}

export default Card;
