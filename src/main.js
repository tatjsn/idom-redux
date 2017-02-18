/* global customElements, document */
import card from './components/card';

customElements.define('x-card', card);

document.getElementsByTagName('x-card')[0].oncardselect = () => { console.log('app: cardselect'); };
document.getElementsByTagName('x-card')[0].onclick = () => { console.log('app: clicked'); };
