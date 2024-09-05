import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { clearCart } from './carrito';  // Import the updated clearCart function

const Success = () => {
    const router = useRouter();
    const { session_id } = router.query;
    const [user] = useAuthState(auth);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch(`/api/get-checkout-session?session_id=${session_id}`);
                if (!response.ok) throw new Error('Failed to fetch session');
                const session = await response.json();

                console.log('Session Data:', session);

                if (user) {
                    const userDocRef = doc(db, 'users', user.uid);

                    // Get the PDF paths from the session data
                    const purchasedPDFs = session.line_items.data.map((item) => {
                        return `/recipes/${item.description.replace(/\s/g, '_').toLowerCase()}.pdf`;
                    });

                    if (purchasedPDFs.length > 0) {
                        // Update the user's Firestore document with the purchased PDFs
                        await updateDoc(userDocRef, {
                            recipes: arrayUnion(...purchasedPDFs),
                        });
                        await clearCart(user);
                        router.push('/home');
                    } else {
                        console.error('No line items found in the session');
                    }
                }
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        };
        if (session_id) {
            fetchSession();
        }
    }, [session_id, user, router]);
    return <div>Loading...</div>;
};

export default Success;
