import { JSX, mergeProps } from "solid-js";
import { CoreAdmin } from "../core";
import { Layout } from './layout';

export const Admin = (props: { children: JSX.Element; layout: any }) => {
    const merged = mergeProps({ layout: Layout }, props);
    return <CoreAdmin {...merged} />;
};
