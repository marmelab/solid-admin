import get from 'lodash/get';
import { DataRecord, useRecord } from '../record';

export const TextInput = (props: { label?: string; source: string }) => {
	return (
		<div class="form-control w-full max-w-xs">
			<label class="label">
				<span class="label-text">{props.label ?? props.source}</span>
			</label>
			<input name={props.source} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
		</div>
	);
};
