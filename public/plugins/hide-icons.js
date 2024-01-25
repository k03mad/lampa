(() => {
    const ITEMS_HIDE_SELECTORS = [
        '.open--premium',
        '.open--feed',
    ];

    const hide = () => ITEMS_HIDE_SELECTORS.forEach(item => $(item).hide());

    if (window.appready) {
        hide();
    } else {
        Lampa.Listener.follow('app', event => {
            if (event.type === 'ready') {
                hide();
            }
        });
    }
})();
