import { createContext, useContext } from 'solid-js';

export const SaveContext = createContext<SaveContextValue>();

export type SaveContextValue = (values: any) => Promise<any> | void;

export const SaveContextProvider = (props: { value: SaveContextValue; children: any }) => {
	return <SaveContext.Provider value={props.value}>{props.children}</SaveContext.Provider>;
};

export const useSaveContext = () => {
	const context = useContext(SaveContext);

	if (!context) {
		throw new Error('useSaveContext must be used within a SaveContextProvider');
	}
	return context;
};
