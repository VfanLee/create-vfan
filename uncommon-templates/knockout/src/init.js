require.config({
  baseUrl: '.',
  config: {
    i18n: {
      locale: 'en',
    },
  },
  paths: {
    text: [
      'vendors/require-text.min',
      // 'https://cdn.jsdelivr.net/npm/requirejs-text@2.0.16/text.min'
    ],
    css: [
      'vendors/require-css.min',
      // 'https://cdn.jsdelivr.net/npm/require-css@0.1.10/css.min'
    ],
    i18n: ['vendors/i18n'],
    knockout: [
      'vendors/knockout.min',
      // 'https://cdn.jsdelivr.net/npm/knockout@3.5.1/build/output/knockout-latest.min'
    ],
  },
})

require(['knockout', 'appViewModel'], function (ko, appViewModel) {
  ko.applyBindings(new appViewModel(), document.getElementById('app'))
})
