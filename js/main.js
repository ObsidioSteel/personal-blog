import { router } from './router/router.js';

window.addEventListener('popstate', router);
window.addEventListener('load', router);
