import { For, mergeProps } from 'solid-js';

export const Pagination = (props: {
	total: number;
	perPage: number;
	page: number;
	size?: 'xs' | 'sm' | 'md' | 'lg';
	// eslint-disable-next-line no-unused-vars
	setPage: (page: number) => void;
}) => {
	const merged = mergeProps({ size: 'sm' }, props);

	const pages = () => {
		return Math.ceil(props.total / props.perPage);
	};

	return (
		<div class="btn-group">
			<For each={Array.from({ length: pages() })}>
				{(_, i) => (
					<button
						class={`btn btn-${merged.size}`}
						classList={{ 'btn-active': i() + 1 === props.page }}
						onClick={() => props.setPage(i() + 1)}
					>
						{i() + 1}
					</button>
				)}
			</For>
		</div>
	);
};
