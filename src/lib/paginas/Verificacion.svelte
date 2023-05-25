<script>
    import { getContext, onMount } from "svelte";
    import { navigate, useLocation } from "svelte-navigator";
    import {
        anadirNotificacionError,
        anadirNotificacionExito,
    } from "../utils/utilidadesNotificaciones";

    const location = useLocation();
    const URL = getContext("URL");

    onMount(async () => {
        if (await verificarUsuario()) {
            anadirNotificacionExito(
                "¡Usuario verificado! Ya puedes iniciar sesión con tu cuenta."
            );
        } else {
            anadirNotificacionError(
                "No se ha podido verificar el usuario. Por favor, inténtelo de nuevo."
            );
        }
        navigate("/");
    });

    const verificarUsuario = async () => {
        const idUsuario = $location.search;
        const respuesta = await fetch(`${URL.usuarios}/verificar${idUsuario}`);
        if (respuesta.status === 200) {
            return true;
        } else {
            return false;
        }
    };
</script>