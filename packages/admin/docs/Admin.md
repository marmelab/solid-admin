# `<Admin>`

The `<Admin>` component is the root of your application.

## Props

- `dataProvider`: Required. A data provider, responsible for the communication with your API
- `authProvider`: Optional. An auth provider, responsible for handling authentication
- `i18nProvider`: Optional. An i18n provider, responsible for handling translations
- `layout`: Optional. A Solid component, used to wrap your entire UI and include things like the top navigation
- `login`: Optional. A Solid component, rendered on the `/login` route.
- `dashboard`: Optional. A Solid component, rendered on the `/` route. Defaults to the first resource.

## Example

```jsx
import { Admin, Resource } from '@solid-admin/admin';
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import i18nProvider from './i18nProvider';
import { Dashboard } from './dashboard';
import posts from './posts';
import comments from './comments';

export const App = () => {
	return (
		<Admin
			authProvider={authProvider}
			dataProvider={dataProvider}
			i18nProvider={i18nProvider}
			dashboard={Dashboard}
		>
			<Resource name="posts" {...posts} />
			<Resource name="comments" {...comments} />
		</Admin>
	);
```

## Theme

The default UI leverages [DaisyUI](https://daisyui.com/) and [Tailwind](https://tailwindcss.com/). DaisyUI supports [themes](https://daisyui.com/docs/themes/) and provides many by default. To change the theme, wrap your admin inside a `<div>` with a `data-theme` attribute:

```jsx
import { Admin, Resource } from '@solid-admin/admin';
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import i18nProvider from './i18nProvider';
import { Dashboard } from './dashboard';
import posts from './posts';
import comments from './comments';

export const App = () => {
	return (
		<div data-theme="corporate">
			<Admin
                authProvider={authProvider}
                dataProvider={dataProvider}
                i18nProvider={i18nProvider}
                dashboard={Dashboard}
            >
				<Resource name="posts" {...posts} />
				<Resource name="comments" {...comments} />
			</Admin>
		</div>
	);
```