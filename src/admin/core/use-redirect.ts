import { useNavigate } from "@solidjs/router";
import { useRecord } from "./record";
import { useResource } from "./resource";

export const useRedirect = () => {
    const navigate = useNavigate();
    const resource = useResource();
    const record = useRecord({});

    return (to: string) => {
        switch (to) {
            case "list":
                return navigate(`/${resource}`);
            case "create":
                return navigate(`/${resource}/create`);
            case "edit":
                return navigate(`/${resource}/${record()?.id}`);
            case "show":
                return navigate(`/${resource}/${record()?.id}/show`);
            default:
                return navigate(to);
        }
    };
}