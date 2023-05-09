<script>
    import { usuario } from "./store";
    import { abrirModalBorrarCuenta } from "./utilidadesModales";

    const borrarCuenta = () => {
        console.log($usuario.id);
        // fetch(`http://localhost:8090/usuarios/${$usuario.id}`, {
        //     method: "DELETE",
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log("Success:", data);
        //         localStorage.removeItem("usuario");
        //         window.location.href = "/";
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
    };
</script>

<div>
    <h4 class="border-bottom pb-3">
        Para borrar tu cuenta, pulsa el botón de abajo
    </h4>
    <div class="text-center mt-4">
        <button class="btn btn-primary boton-azul" on:click={abrirModalBorrarCuenta}
            >Borrar cuenta</button
        >
    </div>
</div>
