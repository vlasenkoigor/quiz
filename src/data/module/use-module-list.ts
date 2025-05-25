import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/services/firebase-app';
import { TModule } from '@/data/module/module-api';

// get all modules without subscribing to changes
export function useModuleList() {
  const [modules, setModules] = useState<TModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, 'module_group')).then((res) => {
      setModules(res.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as TModule));
      setLoading(false);
    });

    setModules(modules);
  }, []);

  return { modules, loading };
}
