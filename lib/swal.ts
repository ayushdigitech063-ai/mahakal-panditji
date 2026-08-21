import Swal from 'sweetalert2';

export const showAlert = {
  success: (title: string, text?: string) => {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonColor: '#c96b18',
      background: '#fffaf2',
      color: '#2b2118',
      customClass: {
        popup: 'rounded-2xl border border-[#eadfce]',
      },
    });
  },

  error: (title: string, text?: string) => {
    return Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonColor: '#8f3f12',
      background: '#fffaf2',
      color: '#2b2118',
      customClass: {
        popup: 'rounded-2xl border border-[#eadfce]',
      },
    });
  },

  confirm: (title: string, text: string, confirmButtonText: string = 'Yes, Proceed') => {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c96b18',
      cancelButtonColor: '#75695d',
      confirmButtonText,
      cancelButtonText: 'Cancel',
      background: '#fffaf2',
      color: '#2b2118',
      customClass: {
        popup: 'rounded-2xl border border-[#eadfce]',
      },
    });
  },
};
