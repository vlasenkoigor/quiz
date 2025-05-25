import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { moduleCollectionName } from '@/data/module/module-api';
import { db } from '@/services/firebase-app';

// get all modules
const getAll = async (moduleID: string): Promise<TLesson[]> => {
  const querySnapshot = await getDocs(listQuery(moduleID));

  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  }) as TLesson[];
};

// subscribe to modules
const subscribe = (cb: (modules: TModule[]) => void): (() => void) => {
  const unsub = onSnapshot(listQuery, (snapshot) => {
    const data = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    }) as TModule[];

    console.log('data', data);
    cb(data);
  });

  return unsub;
};

// add module
const add = async (data: Partial<TModule>) => {
  const [firstByOrder] = await get(1);

  const order = firstByOrder ? firstByOrder.order + 1 : 1;

  await addDoc(collection(db, lessonCollectionName), { ...data, order });
};

// update module
const update = async (id: string, data: Partial<TModule>) => {
  await updateDoc(doc(db, lessonCollectionName, id), data);
};

// remove module
const remove = async (id: string) => {
  await deleteDoc(doc(db, lessonCollectionName, id));
};

// change order
const changeOrder = async (modules: TModule[], id: string, direction: 'up' | 'down') => {
  const module = modules.find((module) => module.id === id);

  if (!module) {
    return;
  }

  const index = modules.indexOf(module);

  if (direction === 'up') {
    if (index === 0) {
      return;
    }

    const prevModule = modules[index - 1];
    const newOrder = prevModule.order;

    await updateDoc(doc(db, lessonCollectionName, module.id), { order: newOrder });
    await updateDoc(doc(db, lessonCollectionName, prevModule.id), { order: module.order });
  } else {
    if (index === modules.length - 1) {
      return;
    }

    const nextModule = modules[index + 1];
    const newOrder = nextModule.order;

    await updateDoc(doc(db, lessonCollectionName, module.id), { order: newOrder });
    await updateDoc(doc(db, lessonCollectionName, nextModule.id), { order: module.order });
  }
};

const lessonCollectionName = 'lessons';

const getCollection = (moduleID: string) => collection(db, moduleCollectionName, moduleID, lessonCollectionName);

const listQuery = (moduleID: string) => query(getCollection(moduleID), orderBy('order', 'desc'));

export type TLesson = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export const moduleApi = {
  getAll,
  subscribe,
  add,
  update,
  remove,
  changeOrder,
};
