import { ColumnDef, createSolidTable, flexRender, getCoreRowModel } from '@tanstack/solid-table';
import { For, mergeProps, Show } from 'solid-js';
import { RecordProvider, useList } from '../../../core';

export const DataGrid = (props: { columns: ColumnDef<any, any>[] }) => {
	const list = useList();
	const table = createSolidTable({
		get data() {
			return list?.data() ?? [];
		},
		columns: props.columns,
		getCoreRowModel: getCoreRowModel(),
	});
	return (
		<div class="overflow-x-auto w-full flex flex-col gap-4">
			<table class="table table-compact w-full">
				<thead>
					<For each={table.getHeaderGroups()}>
						{(headerGroup) => (
							<tr>
								<For each={headerGroup.headers}>
									{(header) => (
										<th colSpan={header.colSpan}>
											<Show when={!header.isPlaceholder}>
												<div
													class={header.column.getCanSort() ? 'cursor-pointer select-none' : undefined}
													onClick={header.column.getToggleSortingHandler()}
												>
													{flexRender(header.column.columnDef.header, header.getContext())}
													{{
														asc: ' 🔼',
														desc: ' 🔽',
													}[header.column.getIsSorted() as string] ?? null}
												</div>
											</Show>
										</th>
									)}
								</For>
							</tr>
						)}
					</For>
				</thead>
				<tbody>
					<For each={table.getRowModel().rows.slice(0, 10)}>
						{(row) => (
							<RecordProvider record={row.original}>
								<tr>
									<For each={row.getVisibleCells()}>
										{(cell) => <td>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>}
									</For>
								</tr>
							</RecordProvider>
						)}
					</For>
				</tbody>
			</table>
			<div class="flex justify-between">
				<Pagination
					total={list.total() ?? 0}
					perPage={list.pagination().perPage}
					page={list.pagination().page}
					setPage={list.setPage}
				/>
			</div>
		</div>
	);
};

const Pagination = (props: {
	total: number;
	perPage: number;
	page: number;
	size?: 'xs' | 'sm' | 'md' | 'lg';
	setPage: (page: number) => void;
}) => {
	const pages = Math.ceil(props.total / props.perPage);
	const merged = mergeProps({ size: 'sm' }, props);

	return (
		<div class="btn-group">
			<For each={Array.from({ length: pages })}>
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
