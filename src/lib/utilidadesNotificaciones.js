import { toast } from '@zerodevx/svelte-toast'

const anadirNotificacionExito = (mensaje) => {
    toast.push(mensaje, {
        theme: {
            '--toastBackground': 'rgb(72,187,120)',
            '--toastBarBackground': '#2F855A'
        }
    });
};

const anadirNotificacionError = (mensaje) => {
    toast.push(mensaje, {
        theme: {
            '--toastBackground': '#dc3545',
            '--toastBarBackground': '#b02a37'
        }
    });
};

const anadirNotificacionCargando = (mensaje) => {
    return toast.push(mensaje, {
        initial: 0,
        dismissable: false,
        theme: {
            '--toastBackground': '#4154f1'
        }
    })
};

const eliminarNotificacionCargando = (id) => {
    toast.pop(id);
};

export { anadirNotificacionExito, anadirNotificacionError, anadirNotificacionCargando, eliminarNotificacionCargando };