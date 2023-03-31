import {
	ColumnDef,
	createSolidTable,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	Header,
	SortingState,
} from '@tanstack/solid-table';
import { createEffect, createSignal, For, Show } from 'solid-js';
import { arrowSmallDown, arrowSmallUp } from 'solid-heroicons/solid';
import { Icon } from 'solid-heroicons';
import { RecordProvider, useList } from '@solid-admin/core';
import { Pagination } from './pagination';

export const DataGrid = (props: { columns: ColumnDef<any, any>[] }) => {
	const list = useList();
	
	const [sorting, setSorting] = createSignal<SortingState>([
		{ id: list?.sort.field ?? 'id', desc: list?.sort.order === 'DESC' },
	]);

	createEffect(() => {
		const newSorting = sorting();

		if (newSorting.length > 0) {
			const order = newSorting[0].desc ? 'DESC' : 'ASC';
			const field = newSorting[0].id;
			list?.setSort({ field, order });
		}
	});
	const table = createSolidTable({
		get data() {
			return list?.data ?? [];
		},
		columns: props.columns,
		state: {
			get sorting() {
				return sorting();
			},
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		manualSorting: true,
		manualPagination: true,
	});

	const handleHeaderClick = (header: Header<unknown, unknown>, event: MouseEvent) => {
		event.preventDefault();
		if (header.column.getCanSort()) {
			header.column.toggleSorting(header.column.getIsSorted() === 'asc' ? true : false);
		}
	};

	return (
		<div class="overflow-x-auto w-full flex flex-col gap-4">
			<table class="table table-compact w-full">
				<thead>
					<For each={table.getHeaderGroups()}>
						{(headerGroup) => (
							<tr>
								<For each={headerGroup.headers}>
									{(header) => {
										return (
											<th
												colSpan={header.colSpan}
												aria-sort={header.column.getIsSorted() === 'asc' ? 'ascending' : 'descending'}
											>
												<Show when={!header.isPlaceholder}>
													<Show
														when={header.column.getCanSort()}
														fallback={flexRender(header.column.columnDef.header, header.getContext())}
													>
														<button
															class={header.column.getCanSort() ? 'uppercase cursor-pointer select-none' : undefined}
															onClick={[handleHeaderClick, header]}
														>
															{flexRender(header.column.columnDef.header, header.getContext())}
															<Show when={header.column.getIsSorted() === 'asc'}>
																<Icon class="h-4 w-4 inline-block ml-2" path={arrowSmallUp} />
															</Show>
															<Show when={header.column.getIsSorted() === 'desc'}>
																<Icon class="h-4 w-4 inline-block ml-2" path={arrowSmallDown} />
															</Show>
														</button>
													</Show>
												</Show>
											</th>
										);
									}}
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
					total={list.total ?? 0}
					perPage={list.pagination.perPage}
					page={list.pagination.page}
					setPage={list.setPage}
				/>
			</div>
		</div>
	);
};
