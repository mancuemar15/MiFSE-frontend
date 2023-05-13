<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { usuario } from "./store";

    export let tipoUsuario;

    const navigate = useNavigate();
    const location = useLocation();

    $: if (!$usuario || (tipoUsuario === 1 && $usuario.tipoUsuario.id !== 1)) {
        navigate("/not-found", {
            state: { from: $location.pathname },
            replace: true,
        });
    }
</script>

{#if $usuario && ((tipoUsuario === 1 && $usuario.tipoUsuario.id === 1) || tipoUsuario === 2)}
    <slot />
{/if}
