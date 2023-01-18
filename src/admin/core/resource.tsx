import { Component, createContext, JSX, onCleanup, onMount, Show, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Route } from '@solidjs/router';
import { Dynamic } from 'solid-js/web';

export const Resource = (props: {
	children?: JSX.Element;
	name: string;
	list?: Component;
	create?: Component;
	edit?: Component;
	show?: Component;
	recordRepresentation?: GetRecordRepresentation;
}) => {
	const { registerResource, unregisterResource } = useResourcesContext();

	const definition = {
		name: props.name,
		hasList: props.list != null,
		hasCreate: props.create != null,
		hasEdit: props.edit != null,
		hasShow: props.show != null,
		recordRepresentation: props.recordRepresentation,
	};

	onMount(() => {
		registerResource(definition);
	});

	onCleanup(() => {
		unregisterResource(definition);
	});

	return (
		<Route path={props.name}>
			<Show when={props.list != null}>
				<Route
					path="/"
					element={
						<ResourceProvider resource={props.name}>
							<Dynamic component={props.list} />
						</ResourceProvider>
					}
				/>
			</Show>
			<Show when={props.create != null}>
				<Route
					path="/create"
					element={
						<ResourceProvider resource={props.name}>
							<Dynamic component={props.create} />
						</ResourceProvider>
					}
				/>
			</Show>
			<Show when={props.edit != null}>
				<Route
					path="/:id"
					element={
						<ResourceProvider resource={props.name}>
							<Dynamic component={props.edit} />
						</ResourceProvider>
					}
				/>
			</Show>
			<Show when={props.show != null}>
				<Route
					path="/:id/show"
					element={
						<ResourceProvider resource={props.name}>
							<Dynamic component={props.show} />
						</ResourceProvider>
					}
				/>
			</Show>
			{props.children}
		</Route>
	);
};

export type GetRecordRepresentation = (record: any) => JSX.Element;

export type ResourceDefinition = {
	name: string;
	hasList: boolean;
	hasCreate: boolean;
	hasEdit: boolean;
	hasShow: boolean;
	recordRepresentation?: GetRecordRepresentation;
};
export const ResourceContext = createContext<string>();

export const ResourceProvider = (props: { children: JSX.Element; resource: string }) => {
	return <ResourceContext.Provider value={props.resource}>{props.children}</ResourceContext.Provider>;
};

export const useResource = (options?: { resource?: string }) => {
	if (options?.resource) {
		return options.resource;
	}
	const context = useContext(ResourceContext);
	if (!context) {
		throw new Error('useResource must be used within a ResourceProvider');
	}
	return context;
};

export const ResourcesContext = createContext<{
	resources: ResourceDefinition[];
	registerResource: (resource: ResourceDefinition) => void;
	unregisterResource: (resource: ResourceDefinition) => void;
}>();

export const ResourcesProvider = (props: { children: JSX.Element }) => {
	const [resources, setResources] = createStore<ResourceDefinition[]>([]);
	const registerResource = (resource: ResourceDefinition) => {
		setResources((resources) => [...resources, resource]);
	};

	const unregisterResource = (resource: ResourceDefinition) => {
		setResources((resources) => resources.filter((r) => r.name !== resource.name));
	};

	return (
		<ResourcesContext.Provider value={{ resources, registerResource, unregisterResource }}>
			{props.children}
		</ResourcesContext.Provider>
	);
};

export const useResources = () => {
	const context = useContext(ResourcesContext);
	if (!context) {
		throw new Error('useResources must be used within a ResourcesProvider');
	}
	return context.resources;
};

export const useResourceDefinition = (options: { resource?: string }) => {
	const resources = useResources();
	const resource = useResource(options);
	if (!resources) {
		throw new Error('useResourceDefinition must be used within a ResourcesProvider');
	}
	return resources.find((r) => r.name === resource);
};

const useResourcesContext = () => {
	const context = useContext(ResourcesContext);
	if (!context) {
		throw new Error('useResourcesContext must be used within a ResourcesProvider');
	}
	return context;
};
