import { createContext, useContext, useState, useEffect, PropsWithChildren, FC } from 'react';
import { moduleApi, type TModule } from '@/data/module/module-api';
import { mutateAction } from '../lib/utils';
import { useParams } from 'react-router';

export const AdminModuleProvider: FC<PropsWithChildren<AdminModuleListProviderProps>> = ({ children }) => {
  const { moduleId } = useParams();

  const [module, setModule] = useState<TModule>(null as unknown as TModule);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);

    moduleApi.subscribeOne(moduleId, (module) => {
      setModule(module);
      setLoading(false);
    });
  }, []);

  const removeModule = mutateAction(() => moduleApi.remove(moduleId), setError, setMutating);

  const updateModule = mutateAction(async (module) => moduleApi.update(moduleId, module), setError, setMutating);

  return (
    <AdminModuleContext.Provider
      value={{
        moduleId,
        module,
        loading,
        mutating,
        error,
        removeModule,
        updateModule,
      }}
    >
      {children}
    </AdminModuleContext.Provider>
  );
};

export const useAdminModule = () => {
  return useContext(AdminModuleContext);
};

const AdminModuleContext = createContext<TAdminModuleListContext>(null as unknown as TAdminModuleListContext);

type TAdminModuleListContext = {
  moduleId: string;
  module: TModule;
  loading: boolean;
  mutating: boolean;
  error: string | null;
  removeModule: () => Promise<void>;
  updateModule: (module: Partial<TModule>) => Promise<void>;
};
