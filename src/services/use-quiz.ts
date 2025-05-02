import React, {useEffect, useRef, useState} from "react";
import {
	collection,
	doc,
	onSnapshot,
	setDoc,
	updateDoc,
	deleteDoc,
	DocumentReference,
	getDocs, getDoc
} from "firebase/firestore";
import {db} from "./firebase-app.ts";

export type TQuiz = {
	id: string,

	questions?: TQuestion[]
}

export type TQuestion = {
	text: string,

	answers?: TAnswer[]
}

export type TAnswer = {
	text: string,
	correct: boolean
}

export function useReadQuizzes(moduleID: string) {
	const [quizzes, setQuizzes] = useState([] as TQuiz[]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getDocs(collection(db, "module_group", moduleID, 'quizzes'))
			.then((res) => {
				setQuizzes(res.docs.map(doc => ({id: doc.id, ...doc.data()}) as TQuiz))
				setLoading(false);
			});
	}, []);

	return {quizzes, loading}
}

export function useReadQuiz(moduleID: string, quizID: string) {
	const [quiz, setQuiz] = useState<TQuiz | null>(null);

	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getDoc(doc(db, "module_group", moduleID, 'quizzes', quizID))
			.then((doc) => {
				if (doc.exists()) {
					setQuiz({id: doc.id, ...doc.data()} as TQuiz)
				} else {
					setError('Quiz not found');
				}
			})
	}, []);


	return {quiz, error}
}

export function useQuizzes(moduleRef: React.MutableRefObject<DocumentReference>) {
	const [quizzes, setQuizzes] = React.useState<TQuiz[]>([]);

	const quizzesCollection = collection(moduleRef.current, 'quizzes');

	const [isUpdating, setIsUpdating] = useState(false);

	useEffect(() => {
		onSnapshot(quizzesCollection, (snapshot) => {
			const data = snapshot.docs.map(doc => {
				return {id: doc.id, ...doc.data()}
			}) as TQuiz[]

			setQuizzes(data)
		})
	}, []);


	async function addQuiz() {
		const newQuizRef = doc(quizzesCollection);
		setIsUpdating(true);
		await setDoc(newQuizRef, {});
		setIsUpdating(false);
	}

	async function deleteQuiz(id: string) {
		const lessonRef = doc(quizzesCollection, id);

		setIsUpdating(true);
		await deleteDoc(lessonRef);
		setIsUpdating(false);
	}

	return {
		addQuiz,
		deleteQuiz,
		quizzes,
		isUpdating
	};
}

//
export function useQuiz(moduleID: string, quizID: string) {
	const [quiz, setQuiz] = useState<TQuiz>();

	const [error, setError] = useState<string | undefined>(undefined);

	const [isUpdating, setIsUpdating] = useState(false);

	const quizRef = useRef(doc(db, "module_group", moduleID, 'quizzes', quizID))

	useEffect(() => {
		const unsub = onSnapshot(quizRef.current, (doc) => {

			if (!doc.exists()) {
				setError('Quiz not found');
				return;
			}

			setQuiz({id: doc.id, ...doc.data()} as TQuiz);
		});

		return () => {
			unsub();
		}
	}, []);

	async function updateQuiz(data: Partial<TQuiz>) {
		setIsUpdating(true);
		await updateDoc(quizRef.current, data);
		setIsUpdating(false);
	}

	return {
		error,
		quiz,
		updateQuiz,
		isUpdating,
	}
}
