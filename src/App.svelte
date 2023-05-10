<script>
  import { Router } from "svelte-navigator";
  import Nav from "./lib/Nav.svelte";
  import Contenido from "./lib/Contenido.svelte";
  import Footer from "./lib/Footer.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
</script>

<Router>
  <SvelteToast />
  <Nav />
  <Contenido />
  <Footer />
</Router>
