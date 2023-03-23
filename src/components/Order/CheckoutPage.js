/**
 * While confirmation=false, the bag is still just listed in the 'bag' collection.
 * Once paid, setConfirmation=true & show confirmation text instead of stripe form.
 * 
 * 
 * This page should show: 
 *  - item in the cart if have not paid yet
 *  - payment form to pay with stripe
 * 
 *  - upon payment, should show confirmation 
 *      - includes reminder about bringing own bag & pickup window.
 */

// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

import {getApp} from "@firebase/app";
import { getStripePayments, getProducts } from "@stripe/firestore-stripe-payments";

const app = getApp();
const payments = getStripePayments(app, {
    bagsCollection: "bags",
    usersCollection: "users"
});
const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true
});

const CheckoutPage = () => {

};

export default CheckoutPage;