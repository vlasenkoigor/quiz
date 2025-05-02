import {ref, listAll, getDownloadURL, getMetadata, uploadBytes, deleteObject, FullMetadata} from "firebase/storage";
import {storage} from "./firebase-app.ts";
import {useEffect, useState} from "react";

export type TImage = {
    name: string;
    url: string;
    metadata: FullMetadata;
}

export function useImages() {
    const [images, setImages] = useState<TImage[] | null>(null)

    useEffect(() => {
        refreshImages();
    }, []);

    async function refreshImages() {
        setImages(await getImages());
    }

    return {images, uploadImage, deleteImage, refreshImages};
}

async function getImages(): Promise<TImage[]> {
    const listRef = ref(storage);

    return (await Promise.all((await listAll(listRef)).items.map(async (ref) => {
        const [url, metadata] = await Promise.all([
            getDownloadURL(ref), getMetadata(ref)
        ]);

        return {
            name: ref.name,
            url,
            metadata
        }

    }))).sort((a, b) => (+Date.parse(b.metadata.timeCreated)) - (+Date.parse(a.metadata.timeCreated)));

}

async function uploadImage(file: File) {
    const storageRef = ref(storage, file.name);

    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
}

async function deleteImage(imageName: string) {
    const storageRef = ref(storage, imageName);

    await deleteObject(storageRef);
}