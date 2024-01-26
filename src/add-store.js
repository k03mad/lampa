(() => {
    const main = () => {
        const NEW_ITEM_ATTR = 'data-component="mad_store"';
        const NEW_ITEM_SELECTOR = `[${NEW_ITEM_ATTR}]`;
        const NEW_ITEM_TEXT = 'Расширения :: Mad';
        const NEW_ITEM_LINK = 'https://k03mad.github.io/lampa/store.json';

        const ITEM_PLUGINS_SELECTOR = '[data-component="plugins"]';

        if (
            Lampa.Settings.main
            && Lampa.Settings.main()
                .render()
                .find(NEW_ITEM_SELECTOR)
                .length === 0
        ) {
            const field = $(/* html */`
              <div class="settings-folder selector" ${NEW_ITEM_ATTR} data-static="true">
                <div class="settings-folder__icon">
                    <svg height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="21" height="21" rx="2" fill="white"></rect>
                        <mask id="path-2-inside-1_154:24" fill="white">
                            <rect x="2" y="27" width="17" height="17" rx="2"></rect>
                        </mask>
                        <rect x="2" y="27" width="17" height="17" rx="2" stroke="white" stroke-width="6" mask="url(#path-2-inside-1_154:24)"></rect>
                        <rect x="27" y="2" width="17" height="17" rx="2" fill="white"></rect>
                        <rect x="27" y="34" width="17" height="3" fill="white"></rect>
                        <rect x="34" y="44" width="17" height="3" transform="rotate(-90 34 44)" fill="white"></rect>
                    </svg>
                </div>
                <div class="settings-folder__name">${NEW_ITEM_TEXT}</div>
              </div>
            `);

            Lampa.Settings.listener.follow('open', event => {
                if (event.name === 'main') {
                    event.body
                        .find(NEW_ITEM_SELECTOR)
                        .on('hover:enter', () => {
                            Lampa.Extensions.show({
                                store: NEW_ITEM_LINK,
                                with_installed: true,
                            });
                        });
                }
            });

            Lampa.Settings.main()
                .render()
                .find(ITEM_PLUGINS_SELECTOR)
                .after(field);

            Lampa.Settings.main().update();
        }
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
