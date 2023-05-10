import { navigate } from "svelte-navigator"

export const redireccionarNotFound = () => {
    navigate("/not-found", { replace: true });
}