import 'solid-js';

declare module 'solid-js' {
	// eslint-disable-next-line no-unused-vars
	namespace JSX {
		// eslint-disable-next-line no-unused-vars
		interface Directives {
			form: true;
		}
	}
}
