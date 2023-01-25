import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51MTRUcAJuYJIhg7dKB5yhN0nF8v1sLbGFJKURLhCO8AnMr25GVpavNk3Klgz0yefQqNBE2Cr77pNXbBQo89C2kpx00qAm8GGUi'
);

export const bookTour = async (tourId) => {
  try {
    // Get the session from the server
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    console.log(session);
    // Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
