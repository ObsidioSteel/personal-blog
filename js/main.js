import { router } from './router/router.js';
import { initNav, initLangSwitcher } from './ui/nav.js';

initNav();
initLangSwitcher();
window.addEventListener('popstate', router);
window.addEventListener('load', router);
