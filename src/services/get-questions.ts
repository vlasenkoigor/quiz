import { getDocs, collection } from 'firebase/firestore';
import { db, storage } from './firebase-app';
import { ref, getDownloadURL } from 'firebase/storage';

export type TPlayer = { name: string; club: string; jerseyNumber: number; wrongJerseyNumbers: number[]; image: string };

export const getQuestions: () => Promise<TPlayer[]> = async () => {
  const res = await getDocs(collection(db, 'questions'));

  res.docs.map((doc) => console.log(doc.data()));

  const players = res.docs.map((doc) => doc.data() as TPlayer);

  return await Promise.all(
    players.map(async (player) => {
      player.image = await getDownloadURL(ref(storage, player.image));

      return player;
    }),
  );
};

export const getModules = async () => {
  const res = await getDocs(collection(db, 'module_group'));

  return res.docs.map((doc) => doc.data());

  //     res.docs.forEach(doc => {
  //         console.log(doc.data(), doc.get('name'))
  //
  //         getDocs(collection(doc.ref, 'module')).then(res => {
  //             res.docs.forEach(doc => {
  //                 console.log(doc.data())
  //             })
  //         })
  //
  //     })
};
