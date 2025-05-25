import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebase-app';
import { useAppContext } from '@/app/AppContext';

const WaitAuth: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { api } = useAppContext();

  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('onAuthStateChanged', user);
      setWaiting(false);
      api.setUser(user);
    });
  }, []);

  return <div>{!waiting && children}</div>;
};

export default WaitAuth;
