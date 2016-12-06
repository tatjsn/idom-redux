/* global document window */
import { patch } from 'incremental-dom';
import './elements';

const render = ({ greet, time, ontap }) => (
  <div>
    <h1>{greet}</h1>
    <x-sub-module
      message={greet}
      time={time}
      ontap={ontap}
    />
    <x-sub-module
      message={greet}
      time={time}
      ontap={ontap}
    />
  </div>
);

const app = document.getElementById('app');
patch(app, () => {
  const greet = 'Hi from incremental-dom';
  const time = (new Date()).toISOString();
  render({
    greet,
    time,
    ontap: () => window.alert(greet),
  });
});

const updateButton = document.getElementById('update');
updateButton.onclick = () => {
  patch(app, () => {
    const greet = 'Hello again';
    const time = (new Date()).toISOString();
    render({
      greet,
      time,
      ontap: () => window.alert(greet),
    });
  });
};
