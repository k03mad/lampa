const ITEMS_HIDE_SELECTORS = [
    '.open--premium',
    '.open--feed',
];

const main = () => ITEMS_HIDE_SELECTORS.forEach(item => $(item).hide());

if (window.appready) {
    main();
} else {
    Lampa.Listener.follow('app', event => {
        if (event.type === 'ready') {
            main();
        }
    });
}
