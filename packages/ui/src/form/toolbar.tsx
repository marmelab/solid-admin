import { JSX } from 'solid-js';
import { SaveButton } from '../buttons';

export const Toolbar = (props: { children?: JSX.Element }) => {
	return <div class="flex justify-end mt-4 bg-base-200 p-4">{props.children ?? <SaveButton />}</div>;
};
