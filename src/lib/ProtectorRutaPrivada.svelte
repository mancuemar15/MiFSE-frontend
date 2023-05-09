<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { usuario } from "./store";

    const navigate = useNavigate();
    const location = useLocation();

    $: if (!$usuario) {
        navigate("/", {
            state: { from: $location.pathname },
            replace: true,
        });
    }
</script>

{#if $usuario}
    <slot />
{/if}
