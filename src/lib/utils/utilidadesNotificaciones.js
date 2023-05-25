import { toast } from '@zerodevx/svelte-toast'

const anadirNotificacionExito = (mensaje) => {
    toast.push(mensaje, {
        duration: 3000,
        theme: {
            '--toastBackground': 'rgb(72,187,120)',
            '--toastBarBackground': '#2F855A'
        }
    });
};

const anadirNotificacionError = (mensaje) => {
    toast.push(mensaje, {
        duration: 3000,
        theme: {
            '--toastBackground': '#dc3545',
            '--toastBarBackground': '#b02a37'
        }
    });
};

const anadirNotificacionCargando = (mensaje) => {
    return toast.push(`<div class="d-flex align-items-center"><span class="spinner-border text-light me-2"></span>${mensaje}</div>`, {
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

const anadirNotificacionInfo = (mensaje) => {
    toast.push(mensaje, {
        duration: 3000,
        theme: {
            '--toastBackground': '#4154f1',
            '--toastBarBackground': '#012970'
        }
    });
};

export { anadirNotificacionExito, anadirNotificacionError, anadirNotificacionCargando, eliminarNotificacionCargando, anadirNotificacionInfo };