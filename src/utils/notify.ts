import { toast, Bounce} from 'react-toastify';

export const notifySuccess = (message ='Fue confirmado correctamente', autoClose=1000) => {
    toast.success(message, {
        position: 'top-right',
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
    })
}
