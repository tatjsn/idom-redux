/* global document window */
import { patch } from 'incremental-dom';

const render = ({ greet, ontap }) => (
  <div>
    <h1>{greet}</h1>
    <x-sub-module
      message={greet}
      ontap={ontap}
    />
  </div>
);

const app = document.getElementById('app');
patch(app, () => {
  const greet = 'Hi from incremental-dom';
  render({
    greet,
    ontap: () => window.alert(greet),
  });
});

const updateButton = document.getElementById('update');
updateButton.onclick = () => {
  patch(app, () => {
    const greet = 'Hello again';
    render({
      greet,
      ontap: greet,
    });
  });
};
