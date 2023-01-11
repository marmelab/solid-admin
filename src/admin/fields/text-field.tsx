import get from 'lodash/get';
import { DataRecord, useRecord } from '../record';

export const TextField = (props: { source: string; record?: DataRecord }) => {
	const record = useRecord(props);
	return <span class="neutral-content">{get(record(), props.source)}</span>;
};
