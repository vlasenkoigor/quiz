import { doc, type DocumentReference, getDoc, getDocs, collection, type CollectionReference } from 'firebase/firestore';
import { db } from '@/services/firebase-app';
import { mapError } from '@/lib/firebase-error-mapping';

// get a single document from Firestore by collection and path
export async function getFireBaseDoc<T = unknown>(collectionName: string, path: string[]){
  const docRef = doc(db, collectionName, ...path) as DocumentReference<T>;

  let error: string | undefined;

  try {
    const docItem = await getDoc(docRef);

    if (docItem.exists()) {
      return {
        id: docItem.id,
        ...docItem.data(),
      };
    }

    error = `Document not found in collection ${collectionName} at path ${path.join('/')}`;
  } catch (e) {
    error = mapError(e);
  }

  throw new Error(error);
}

export async function getFireBaseDocs<T = unknown>(collectionName: string, path: string[] = []) {
  const docsRef = collection(db, collectionName, ...path) as CollectionReference<T>;

  let error: string | undefined;

  try {
    const querySnapshot = await getDocs(docsRef);

    const docItems = querySnapshot.docs;

    return docItems.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    error = mapError(e);
  }

  throw new Error(error);
}
