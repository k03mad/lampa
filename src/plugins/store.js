(() => {
    const ATTR_STORE = 'data-component="mad_store"';
    const ATTR_STORE_SELECTOR = `[${ATTR_STORE}]`;

    const MENU_AFTER = '[data-component="plugins"]';
    const MENU_NAME = 'Расширения :: Mad';

    const EXTENSIONS = 'https://cdn.jsdelivr.net/gh/k03mad/lampa/src/store/extensions.json';

    const addStore = () => {
        if (
            Lampa.Settings.main
            && Lampa.Settings.main()
                .render()
                .find(ATTR_STORE_SELECTOR)
                .length === 0
        ) {
            const field = $(/* html */`
              <div class="settings-folder selector" ${ATTR_STORE} data-static="true">
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
                <div class="settings-folder__name">${MENU_NAME}</div>
              </div>
            `);

            Lampa.Settings.main()
                .render()
                .find(MENU_AFTER)
                .after(field);

            Lampa.Settings.main().update();
        }
    };

    Lampa.Settings.listener.follow('open', elem => {
        if (elem.name === 'main') {
            elem.body
                .find(ATTR_STORE_SELECTOR)
                .on('hover:enter', () => {
                    Lampa.Extensions.show({
                        store: EXTENSIONS,
                        with_installed: true,
                    });
                });
        }
    });

    if (window.appready) {
        addStore();
    } else {
        Lampa.Listener.follow('app', e => {
            if (e.type === 'ready') {
                addStore();
            }
        });
    }
})();
