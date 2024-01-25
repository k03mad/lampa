(() => {
    // eslint-disable-next-line strict, unicorn/prefer-module
    'use strict';

    const main = () => {
        const ITEMS_HIDE_SELECTORS = [
            '.open--premium',
            '.open--feed',
        ];

        ITEMS_HIDE_SELECTORS.forEach(item => $(item).hide());
    };

    if (window.appready) {
        main();
    } else {
        Lampa.Listener.follow('app', event => {
            if (event.type === 'ready') {
                main();
            }
        });
    }
})();
