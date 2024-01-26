(() => {
    const main = () => {
        const ITEMS_HIDE_SELECTORS = [
            '.open--premium',
            '.open--feed',
            '.open--settings',
            '.open--profile',
        ];

        const ITEM_REWRITE_SELECTORS = ['.head__split'];

        ITEMS_HIDE_SELECTORS.forEach(item => $(item).hide());

        ITEM_REWRITE_SELECTORS.forEach(item => {
            document.querySelector(item).style.width = 0;
            document.querySelector(item).style.margin = '0 0.7em';
        });
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
