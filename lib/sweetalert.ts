import Swal from 'sweetalert2';

interface BookingModalOptions {
  panditName?: string;
  poojaName?: string;
  startingPrice?: number;
}

export function openBookingModal({ panditName, poojaName, startingPrice }: BookingModalOptions) {
  Swal.fire({
    title: '<strong>Book Your Sacred Pooja 🙏</strong>',
    html: `
      <div style="text-align: left; font-size: 14px; color: #2b2118; line-height: 1.6;">
        ${poojaName ? `<p><strong>Selected Pooja:</strong> <span style="color: #8f3f12;">${poojaName}</span></p>` : ''}
        ${panditName ? `<p><strong>Selected Pandit Ji:</strong> <span style="color: #8f3f12;">${panditName}</span></p>` : ''}
        ${startingPrice ? `<p><strong>Estimated Price Starts From:</strong> <span style="color: #c96b18; font-weight: bold;">₹${startingPrice}</span></p>` : ''}
        <hr style="margin: 12px 0; border: none; border-top: 1px solid #eadfce;" />
        <p style="font-size: 12px; color: #75695d;">Our divine support team will assist you with muhurat, samagri setup, and complete ritual preparations.</p>
      </div>
    `,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Proceed to Booking Form',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#c96b18',
    cancelButtonColor: '#75695d',
    customClass: {
      popup: 'rounded-3xl border border-[#eadfce]',
      title: 'heading-spiritual text-[#8f3f12]',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/contact?pooja=${encodeURIComponent(poojaName || '')}&pandit=${encodeURIComponent(panditName || '')}`;
    }
  });
}

export function showSuccessAlert(title: string, message: string) {
  Swal.fire({
    title: title,
    text: message,
    icon: 'success',
    confirmButtonText: 'Har Har Mahadev 🙏',
    confirmButtonColor: '#c96b18',
    customClass: {
      popup: 'rounded-3xl border border-[#eadfce]',
      title: 'heading-spiritual text-[#8f3f12]',
    },
  });
}
