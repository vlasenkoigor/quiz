import {createContext, useContext, useState, useEffect, PropsWithChildren, FC, useCallback} from "react";
import {moduleApi, type TModule} from "@/services/api/module-api.ts";
import {mutateAction} from "../lib/utils.ts";

export const AdminModuleListProvider: FC<PropsWithChildren> = ({children}) => {
    const [modules, setModules] = useState<TModule[]>([]);
    const [loading, setLoading] = useState(false);
    const [mutating, setMutating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        moduleApi.subscribe((modules) => {
            setModules(modules);
            setLoading(false);
        })
    }, [])

    const addModule = mutateAction(moduleApi.add, setError, setMutating)

    const removeModule = mutateAction(moduleApi.remove, setError, setMutating)

    const changeOrder = useCallback(mutateAction(async (id: string, direction: 'up' | 'down') => {
        await moduleApi.changeOrder(modules, id, direction)
    }, setError, setMutating), [modules])

    const publishModule = mutateAction(async (id, published) => {
        await moduleApi.update(id, {published});
    }, setError, setMutating);

    return (
        <AdminModuleListContext.Provider value={{
            modules, loading, mutating, error, addModule, changeOrder, removeModule, publishModule
        }}>
            {children}
        </AdminModuleListContext.Provider>
    )
}

export const useAdminModuleList = () => {
    return useContext(AdminModuleListContext);
}

const AdminModuleListContext = createContext<TAdminModuleListContext>(null as unknown as TAdminModuleListContext)

type TAdminModuleListContext = {
    modules: any[];
    loading: boolean;
    mutating: boolean;
    error: string | null;
    addModule: (module: Partial<TModule>) => Promise<unknown>;
    removeModule: (id: string) => Promise<void>;
    publishModule: (id: string, published: boolean) => Promise<void>;
    changeOrder: (id: string, direction: 'up' | 'down') => void;
}

