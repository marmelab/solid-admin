import { JSX } from 'solid-js';
import { Form } from '../../core';
import { Toolbar } from './toolbar';

export const SimpleForm = (props: { children: JSX.Element; toolbar?: JSX.Element }) => {
	return (
		<Form class="" {...props}>
			{props.children}
			{props.toolbar ?? <Toolbar />}
		</Form>
	);
};
