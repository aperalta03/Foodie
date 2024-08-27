import Stripe from 'stripe';
import { db } from '../../firebase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { cart, userId } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cart.map((item) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.title,
                        description: item.recipe,  // Recipe path stored in the description
                    },
                    unit_amount: 1000,  // Example price in cents
                },
                quantity: 1,
            })),
            mode: 'payment',
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/carrito`,
        });

        res.status(200).json({ id: session.id });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
