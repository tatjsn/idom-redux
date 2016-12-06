/* global document window */
import { patch } from 'incremental-dom';
import './elements';

const render = ({ greet, time, ontap }) => () => (
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
patch(app, render({
  greet: 'Hi from incremental-dom',
  time: (new Date()).toISOString(),
  ontap: () => window.alert('Hi'),
}));

const updateButton = document.getElementById('update');
updateButton.onclick = () => {
  patch(app, render({
    greet: 'Hi again',
    time: (new Date()).toISOString(),
    ontap: () => window.alert('Hi 2nd time'),
  }));
};
