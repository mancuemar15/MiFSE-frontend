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

export { anadirNotificacionExito, anadirNotificacionError };