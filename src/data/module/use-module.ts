import { useEffect, useState } from 'react';
import { moduleApi, TModule } from '@/data/module/module-api';

export function useModule(moduleId: string) {
  const [module, setModule] = useState<TModule>();

  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    moduleApi.getOne(moduleId)
      .then((data) => {
        setModule(data);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  return {
    module,
    error,
  };
}

