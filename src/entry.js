/* global document */
import { patch } from 'incremental-dom';

const renderSubModule = () => (
  <p>I am submodule</p>
);

const render = ({ greet }) => (
  <div>
    <h1>{greet}</h1>
    {renderSubModule()}
  </div>
);

const app = document.getElementById('app');
patch(app, () => {
  render({ greet: 'Hi from incremental-dom' });
});
