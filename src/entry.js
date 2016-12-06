/* global document window */
import { patch } from 'incremental-dom';

const render = ({ greet }) => (
  <div>
    <h1>{greet}</h1>
    <x-sub-module message={greet}></x-sub-module>
  </div>
);

const app = document.getElementById('app');
patch(app, () => {
  render({ greet: 'Hi from incremental-dom' });
});
