import React, {useCallback, useEffect, useRef, useState} from "react";
import {collection, doc, getDocs, onSnapshot, setDoc, updateDoc, orderBy, query} from "firebase/firestore";
import {db} from "@/services/firebase-app.ts";
import {TModule} from "@/services/api/module-api.ts";



// get all modules without subscribing to changes
export function useReadModules() {
    const [modules, setModules] = useState([] as TModule[]);

    useEffect(() => {

        getDocs(collection(db, 'module_group'))
            .then(res => {
                setModules(res.docs.map(doc => ({id: doc.id, ...doc.data()}) as TModule))
            })


        setModules(modules)

    }, []);

    return {modules}
}



export function useModules() {
    const [loading, setLoading] = useState(true);

    const [mutating, setMutating] = useState(false);

    const [modules, setModules] = React.useState<TModule[]>([]);

    const modulesCollection = collection(db, 'module_group');

    const q = query(modulesCollection, orderBy('order', 'desc'));

    useEffect(() => {
        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => {
                return {id: doc.id, ...doc.data()}
            }) as TModule[]

            setLoading(false);
            setModules(data)
        });

        return () => {
            unsub();
        }
    }, []);

    async function addModule(data: Partial<TModule>) {
        const newModuleRef = doc(modulesCollection);

        await setDoc(newModuleRef, data);
    }


    const changeOrder = useCallback(async (id: string, direction: 'up' | 'down') => {
        const module = modules.find(module => module.id === id);


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

            console.log('changeOrder', id, direction, module, index);
            console.log('changeOrder prevModule', prevModule);


            setMutating(true);
            await updateDoc(doc(db, 'module_group', module.id), {order: newOrder});
            await updateDoc(doc(db, 'module_group', prevModule.id), {order: module.order});
            setMutating(false);
        } else {
            if (index === modules.length - 1) {
                return;
            }

            const nextModule = modules[index + 1];
            const newOrder = nextModule.order;

            setMutating(true);
            await updateDoc(doc(db, 'module_group', module.id), {order: newOrder});
            await updateDoc(doc(db, 'module_group', nextModule.id), {order: module.order});
            setMutating(false);
        }
    }, [modules]);

    return {
        modules,
        loading,
        mutating,
        addModule,
        changeOrder
    };
}


export function useModule(id: string) {
    const [module, setModule] = useState<TModule>();

    const [error, setError] = useState<string | undefined>(undefined);

    const moduleRef = useRef(doc(db, "module_group", id));

    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "module_group", id), (doc) => {
            console.log('module', doc.data());

            if (!doc.exists()) {
                setError('Module not found');
                return;
            }

            setModule({id: doc.id, ...doc.data()} as TModule);
        });

        return () => {
            unsub();
        }
    }, [id]);

    async function updateModule(data: Partial<TModule>) {
        setIsUpdating(true);
        await updateDoc(moduleRef.current, data);
        setIsUpdating(false);
    }

    return {
        error,
        module,
        updateModule,
        isUpdating,
        moduleRef
    }
}
