import { JSX } from 'solid-js';

export const Label = (props: { children: JSX.Element; label?: string; source: string }) => {
	return (
		<div class="form-control w-full max-w-xs">
			<span class="label">
				<span class="label-text">{props.label ?? props.source}</span>
			</span>
			{props.children}
		</div>
	);
};
