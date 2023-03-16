import { Dialog } from '@kobalte/core';
import { CreateDeleteControllerOptions, DataRecord, createDeleteController, useTranslate } from '@solid-admin/core';
import clsx from 'clsx';
import { JSX, splitProps } from 'solid-js';

export const DeleteButton = <
	TRecord extends DataRecord = DataRecord,
	TMeta extends Record<string, unknown> | undefined = undefined,
	TError = unknown,
	TContext = unknown,
>(
	props: DeleteButtonProps<TRecord, TMeta, TError, TContext>,
) => {
	const translate = useTranslate();
	const [local, rest] = splitProps(props, [
		'label',
		'class',
		'record',
		'resource',
		'redirect',
		'mutationOptions',
		'meta',
	]);
	const label = () => translate(local.label ?? 'ra.action.delete', { _: 'Delete' });
	const controller = createDeleteController<TRecord, TMeta, TError, TContext>(local);

	const handleConfirm = () => {
		controller.mutation.mutate();
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<button class={clsx('btn btn-sm', local.class)} type="button" {...rest}>
					{label()}
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay />
				<Dialog.Content>
					<div class="modal modal-open modal-bottom sm:modal-middle">
						<div class="modal-box">
							<Dialog.Title>
								<h3 class="font-bold text-lg">
									{translate('ra.message.delete_title', {
										_: 'Delete %{name} #%{id}',
										name: controller.resource,
										id: controller.record()?.id,
									})}
								</h3>
							</Dialog.Title>

							<Dialog.Description>
								<p class="py-4">
									{translate('ra.message.delete_content', { _: 'Are you sure you want to delete this item?' })}
								</p>
							</Dialog.Description>
							<div class="modal-action">
								<button class="btn btn-error" onClick={handleConfirm}>
									{translate('ra.action.confirm', { _: 'Confirm' })}
								</button>
								<Dialog.CloseButton>
									<button class="btn">
										{translate('ra.action.cancel', { _: 'Cancel' })}
									</button>
								</Dialog.CloseButton>
							</div>
						</div>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export interface DeleteButtonProps<
	TRecord extends DataRecord = DataRecord,
	TMeta extends Record<string, unknown> | undefined = undefined,
	TError = unknown,
	TContext = unknown,
> extends JSX.HTMLAttributes<HTMLButtonElement>,
		CreateDeleteControllerOptions<TRecord, TMeta, TError, TContext> {
	label?: string;
}
