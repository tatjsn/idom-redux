/* global document window */
import { patch } from 'incremental-dom';

const renderSubModule = ({ greet }) => (
  <div>
    <button onclick={() => window.alert(greet)}>Button inside submodule</button>
  </div>
);

const render = ({ greet }) => (
  <div>
    <h1>{greet}</h1>
    {renderSubModule({ greet })}
  </div>
);

const app = document.getElementById('app');
patch(app, () => {
  render({ greet: 'Hi from incremental-dom' });
});
