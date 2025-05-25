import React, { useEffect, useRef, useState } from 'react';
import { collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase-app';

export type TLesson = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export function useLessons(moduleID: string) {
  const [lessons, setLessons] = React.useState<TLesson[]>([]);

  const modulesCollection = collection(db, 'module_group', moduleID, 'lessons');

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    onSnapshot(modulesCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      }) as TLesson[];

      setLessons(data);
    });
  }, []);

  async function addLesson(data: Partial<TLesson>) {
    const newModuleRef = doc(modulesCollection);

    setIsUpdating(true);
    await setDoc(newModuleRef, data);
    setIsUpdating(false);
  }

  async function deleteLesson(id: string) {
    const lessonRef = doc(modulesCollection, id);

    setIsUpdating(true);
    await deleteDoc(lessonRef);
    setIsUpdating(false);
  }

  return {
    addLesson,
    deleteLesson,
    lessons,
    isUpdating,
  };
}
//
export function useLesson(moduleID: string, lessonID: string) {
  const [lesson, setLesson] = useState<TLesson>();

  const [error, setError] = useState<string | undefined>(undefined);

  const [isUpdating, setIsUpdating] = useState(false);

  const lessonRef = useRef(doc(db, 'module_group', moduleID, 'lessons', lessonID));

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'module_group', moduleID, 'lessons', lessonID), (doc) => {
      console.log('module', doc.data());

      if (!doc.exists()) {
        setError('Module not found');
        return;
      }

      setLesson({ id: doc.id, ...doc.data() } as TLesson);
    });

    return () => {
      unsub();
    };
  }, []);

  async function updateLesson(data: Partial<TLesson>) {
    setIsUpdating(true);
    await updateDoc(lessonRef.current, data);
    setIsUpdating(false);
  }

  return {
    error,
    lesson,
    updateLesson,
    isUpdating,
    lessonRef,
  };
}
