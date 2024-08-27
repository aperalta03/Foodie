import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { session_id } = req.query;

        try {
            const session = await stripe.checkout.sessions.retrieve(session_id, {
                expand: ['line_items'],  // Expanding to include line items in the session
            });
            res.status(200).json(session);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', 'GET');
        res.status(405).end('Method Not Allowed');
    }
}
