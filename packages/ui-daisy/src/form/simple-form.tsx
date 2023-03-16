import { JSX } from 'solid-js';
import { Form, FormProps } from '@solid-admin/core';
import { Toolbar } from './toolbar';

export const SimpleForm = (props: SimpleFormProps) => {
	return (
		<Form class="" {...props}>
			{props.children}
			{props.toolbar ?? <Toolbar />}
		</Form>
	);
};

export interface SimpleFormProps extends FormProps {
	toolbar?: JSX.Element;
}
