import {SweetAlertOptions} from 'sweetalert2'

export function SwalError(text: string, button: string): SweetAlertOptions {
    return {
        text: text,
        icon: 'error',
        confirmButtonText: button,
        confirmButtonColor: '#1775D9'
    }
}

export function SwalSuccess(text: string): SweetAlertOptions {
    return {
        icon: 'success',
        title: text,
        showConfirmButton: false,
        confirmButtonColor: '#1775D9',
        timer: 1500
    }
}
