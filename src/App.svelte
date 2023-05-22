<script>
  import { Router } from "svelte-navigator";
  import Nav from "./lib/Nav.svelte";
  import Contenido from "./lib/Contenido.svelte";
  import Footer from "./lib/Footer.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { setContext } from "svelte";

  const URL_BASE = "httpS://mifse.herokuapp.com";
  const URL = {
    ultimasPosiciones: `${URL_BASE}/ultimas-posiciones`,
    centros: `${URL_BASE}/centros`,
    centrosSugerencias: `${URL_BASE}/centros/buscar`,
    especialidadesCentro: `${URL_BASE}/especialidades/centro`,
    comentarios: `${URL_BASE}/comentarios`,
    contacto: `${URL_BASE}/contacto`,
    usuarios: `${URL_BASE}/usuarios`,
    tiposResidentes: `${URL_BASE}/tipos-residentes`,
    tiposTrabajos: `${URL_BASE}/tipos-trabajos`,
    tiposGuardias: `${URL_BASE}/tipos-guardias`,
    especialidadesCentros: `${URL_BASE}/especialidades-centros`,
    listas: `${URL_BASE}/listas`,
    mensajes: `${URL_BASE}/mensajes`,
    titulaciones: `${URL_BASE}/titulaciones`,
    residentes: `${URL_BASE}/residentes`,
    administradores: `${URL_BASE}/administradores`,
  };

  setContext("URL", URL);
</script>

<Router>
  <SvelteToast />
  <Nav />
  <Contenido />
  <Footer />
</Router>
