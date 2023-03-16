import { createContext, useContext } from 'solid-js';

export const SaveContext = createContext<SaveContextValue>();

export type SaveContextValue = { save: (values: any) => Promise<any> | void; isLoading: boolean };

export const SaveContextProvider = (props: { value: SaveContextValue; children: any }) => {
	return <SaveContext.Provider value={props.value}>{props.children}</SaveContext.Provider>;
};

export const useSaveContext = () => {
	const context = useContext(SaveContext);
	return context;
};
