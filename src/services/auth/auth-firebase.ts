import {auth,} from "../firebase-app.ts";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
} from "firebase/auth";

import {FirebaseError} from "firebase/app";

import {useState} from "react";
import {mapError} from "../../lib/firebase-error-mapping.ts";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    return {
        error,

        loading,

        signIn: (email: string, password: string) => signIn(email, password, setError, setLoading),

        signUp: (email: string, password: string) => signUp(email, password, setError, setLoading),

        signInWithProvider: (providerType: 'facebook' | 'google') => signInWithProvider(providerType, setError),

        forgotPassword: () => false,

        signOut: () => signOut()
    }
}


const signIn = async (email: string, password: string, setError: (message: string | null) => void, setLoading: (loading: boolean) => void) => {
    setError(null);
    setLoading(true)

    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        setError(mapError(e))
    }

    setLoading(false);
}

const signUp = async (email: string, password: string, setError: (message: string | null) => void, setLoading: (loading: boolean) => void) => {
    setError(null);
    setLoading(true)

    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        setError(mapError(e))
    }

    setLoading(false);
}

const signInWithProvider = async (providerType: 'facebook' | 'google', setError: (string) => void) => {
    const provider = providerType === 'google' ? new GoogleAuthProvider() : new FacebookAuthProvider();

    provider.setCustomParameters({
        'prompt': 'select_account'
    })

    signInWithPopup(auth, provider)
}

const signOut = async () => {
    return firebaseSignOut(auth);
}

