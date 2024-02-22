/**
 * @see https://nextjs.org/docs/advanced-features/i18n-routing (Next.js doc)
 * @see https://github.com/vinissimus/next-translate/blob/master/README.md (next-translate doc)
 */

const i18n = {
    locales: ['cs-CZ', 'en-GB'],
    defaultLocale: process.env.DEFAULT_LOCALE || 'cs-CZ',
    defaultNamespace: 'common',
    localeDetection: false,
    loadLocaleFrom: async (lang, ns, params = {}) => {
        if (typeof window === 'undefined') {
            return import(`./locales/${lang}/${ns}`).then((r) => r.default);
        }

        const {releaseId = window.releaseId} = params;
        const releaseIdStr = releaseId ? '?v=' + releaseId : '';
        const resp = await fetch(`/locales/${lang}/${ns}.json${releaseIdStr}`);
        return resp.json();
    },
    localeTitle: {
        'cs-CZ': 'Česky',
        'en-GB': 'English',
    },
};

module.exports = i18n;
exports.i18n = i18n;