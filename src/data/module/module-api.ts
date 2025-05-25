import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  limit,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/services/firebase-app';
import { getFireBaseDoc, getFireBaseDocs } from '@/utils/firebase-utils';

// getAll all modules
const getAll = async (_limitItems?: number): Promise<TModule[]> => {
  return getFireBaseDocs<TModule>('module_group')
};

const getOne = async (moduleId: string): Promise<TModule> => {
  return getFireBaseDoc<TModule>('module_group', [moduleId]);
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

// subscribe to one module
const subscribeOne = (id: string, cb: (module: TModule) => void): (() => void) => {
  const unsub = onSnapshot(doc(db, moduleCollectionName, id), (snapshot) => {
    const data = { id: snapshot.id, ...snapshot.data() } as TModule;

    cb(data);
  });

  return unsub;
};

// add module
const add = async (data: Partial<TModule>) => {
  const [firstByOrder] = await getAll(1);

  const order = firstByOrder ? firstByOrder.order + 1 : 1;

  await addDoc(collection(db, moduleCollectionName), { ...data, order });
};

// update module
const update = async (id: string, data: Partial<TModule>) => {
  await updateDoc(doc(db, moduleCollectionName, id), data);
};

// remove module
const remove = async (id: string) => {
  await deleteDoc(doc(db, moduleCollectionName, id));
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

    await updateDoc(doc(db, moduleCollectionName, module.id), { order: newOrder });
    await updateDoc(doc(db, moduleCollectionName, prevModule.id), { order: module.order });
  } else {
    if (index === modules.length - 1) {
      return;
    }

    const nextModule = modules[index + 1];
    const newOrder = nextModule.order;

    await updateDoc(doc(db, moduleCollectionName, module.id), { order: newOrder });
    await updateDoc(doc(db, moduleCollectionName, nextModule.id), { order: module.order });
  }
};

export const moduleCollectionName = 'module_group';

const listQuery = query(collection(db, moduleCollectionName), orderBy('order', 'desc'));

export type TModule = {
  id: string;
  name: string;
  description: string;
  published: boolean;
  image: string;
  order: number;
};

export const moduleApi = {
  getAll,
  getOne,
  subscribe,
  subscribeOne,
  add,
  update,
  remove,
  changeOrder,
};
