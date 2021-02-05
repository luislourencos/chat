import i18next from 'i18next';
const lng = localStorage.getItem('language')

i18next.init({
    lng: lng,
    interpolation: {
        escapeValue: false,
    },
    returnEmptyString: true,
    resources: {
        en: { translation: require('./en.json') },
        es: { translation: require('./es.json') },
    },
});

export { i18next };

export const changeLanguage = (language) => {

    localStorage.setItem('language', language);
    i18next.changeLanguage(language);
};