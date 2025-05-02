import React, {useCallback, useEffect, useRef, useState} from "react";
import {collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc, getDoc, DocumentReference} from "firebase/firestore";
import {db} from "./firebase-app.ts";
import {useAppContext} from "@/app/AppContext.tsx";

export type TProgress = {
    playerId: string,
    modules?: TModuleProgress[],
}

export type TModuleProgress = {
    moduleId: string,
    completed: boolean,
    lessons?: TLessonProgress[],

}

export type TLessonProgress = {
    lessonId: string,
    completed: boolean,
}

export type TQuizProgress = {
    quizId: string,
    completed: boolean,
}

export function useProgress() {
    const {state} = useAppContext()

    const [progress, setProgress] = useState<Partial<TProgress> | null>(null);

    const [error, setError] = useState<string | null>(null);

    const playerProgressDocRef = useRef<DocumentReference | null>(null);

    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (!state.user) return;

        const playerId = state.user.uid;

        playerProgressDocRef.current = doc(db, 'progress', playerId);

        const unsub = onSnapshot(playerProgressDocRef.current, doc => {
            if (doc.exists()) {
                console.log('exists', doc.data())


                setProgress(doc.data())
            } else {
                console.log('does not exist')
                createPlayerProgress({playerId})
                    .then((data) => setProgress(data))
            }
        });

        return () => unsub();

    }, [state.user]);


    async function createPlayerProgress(data: Partial<TProgress>) {
        if (!playerProgressDocRef.current) return data;

        setIsUpdating(true);
        await setDoc(playerProgressDocRef.current, data);
        setIsUpdating(false);

        return data
    }


    const completeLesson = useCallback(async (moduleID: string, lessonId: string) => {
        if (!progress) return console.log('progress is null');

        if (playerProgressDocRef.current === null) return console.log('playerProgressDocRef.current is null');

        if (!progress.modules) progress.modules = [];

        let moduleIndex = progress.modules.findIndex(module => module.moduleId === moduleID);

        if (moduleIndex === -1) {
            progress.modules.push({moduleId: moduleID, completed: false});
            moduleIndex = progress.modules.length - 1;
        }
        ;

        if (!progress.modules[moduleIndex].lessons) progress.modules[moduleIndex].lessons = [];

        let lessonIndex = progress.modules[moduleIndex].lessons?.findIndex(lesson => lesson.lessonId === lessonId) ?? -1

        if (lessonIndex === -1) {
            progress.modules[moduleIndex].lessons?.push({lessonId: lessonId, completed: false});
            lessonIndex = progress.modules[moduleIndex].lessons!.length - 1;
        }
        ;

        (progress.modules[moduleIndex].lessons!)[lessonIndex].completed = true;

        await updateDoc(playerProgressDocRef.current, progress);
    }, [progress])

    return {
        progress,
        completeLesson
    };
}


export function isLessonCompleted(progress: Partial<TProgress>, moduleID: string, lessonId: string) {
    return !!(progress.modules?.find(module => module.moduleId === moduleID)?.lessons?.find(lesson => lesson.lessonId === lessonId)?.completed)
}


