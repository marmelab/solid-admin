# @solid-admin/i18n-polyglot

An I18nProvider for [solid-admin](https://github.com/marmelab/solid-admin) using [Polyglot](https://airbnb.io/polyglot.js/).

## Installation

Solid-admin is available from npm. You can install it (and its required dependencies) using:

```sh
npm install @solid-admin/i18n-polyglot
#or
yarn add @solid-admin/i18n-polyglot
```

## Usage

Wrap the function exported by this package around a function returning translation messages based on a locale to produce a valid `i18nProvider`.

```jsx
import { Admin, Resource } from '@solid-admin/admin';
import polyglotI18nProvider from '@solid-admin/i18n-polyglot';
import englishMessages from './i18n/en';
import frenchMessages from './i18n/fr';

const messages = {
    fr: frenchMessages,
    en: englishMessages,
};

const i18nProvider = polyglotI18nProvider(locale => messages[locale]);

const App = () => (
    <Admin locale="en" i18nProvider={i18nProvider}>
        ...
    </Admin>
);

export default App;
```

## Translation Messages

The `message` returned by the function argument should be a dictionary where the keys identify interface components, and values are the translated string. This dictionary is a simple JavaScript object looking like the following:

```js
{
    ra: {
        action: {
            delete: 'Delete',
            show: 'Show',
            list: 'List',
            save: 'Save',
            create: 'Create',
            edit: 'Edit',
            cancel: 'Cancel',
        },
        ...
    },
}
```

All core translations are in the `ra` namespace, in order to prevent collisions with your own custom translations. The root key used at runtime is determined by the value of the `locale` prop.

The default messages are available [here](https://github.com/marmelab/solid-admin/blob/master/packages/language-english/src/index.ts).

## Asynchronous Locale Change

The function passed as parameter of `polyglotI18nProvider` can return a *Promise* for messages instead of a messages object. This lets you lazy load messages upon language change.

Note that the messages for the default locale (used by react-admin for the initial render) must be returned in a synchronous way. 

```jsx
import polyglotI18nProvider from '@solid-admin/i18n-polyglot';
import englishMessages from './i18n/en';

const asyncMessages = {
    fr: () => import('@solid-admin/language-french').then(messages => messages.default),
    it: () => import('@solid-admin/language-italian').then(messages => messages.default),
};

const messagesResolver = locale => {
    if (locale === 'en') {
        // initial call, must return synchronously
        return englishMessages;
    }
    // change of locale after initial call returns a promise
    return asyncMessages[params.locale]();
}

const i18nProvider = polyglotI18nProvider(messagesResolver);
```

## Using Specific Polyglot Features

Polyglot.js is a fantastic library: in addition to being small, fully maintained, and totally framework agnostic, it provides some nice features such as interpolation and pluralization, that you can use in react-admin.

```js
const messages = {
    'hello_name': 'Hello, %{name}',
    'count_beer': 'One beer |||| %{smart_count} beers',
};

// interpolation
translate('hello_name', { name: 'John Doe' });
=> 'Hello, John Doe.'

// pluralization
translate('count_beer', { smart_count: 1 });
=> 'One beer'

translate('count_beer', { smart_count: 2 });
=> '2 beers'

// default value
translate('not_yet_translated', { _: 'Default translation' });
=> 'Default translation'
```

To find more detailed examples, please refer to [http://airbnb.io/polyglot.js/](https://airbnb.io/polyglot.js/)

## License

Solid-admin is licensed under the [MIT License](https://github.com/marmelab/solid-admin/blob/master/LICENSE.md), sponsored and supported by [marmelab](https://marmelab.com).

## Donate

This library is free to use, even for commercial purpose. If you want to give back, please talk about it, [help newcomers](https://stackoverflow.com/questions/tagged/solid-admin), or contribute code. But the best way to give back is to **donate to a charity**. We recommend [Doctors Without Borders](https://www.doctorswithoutborders.org/).