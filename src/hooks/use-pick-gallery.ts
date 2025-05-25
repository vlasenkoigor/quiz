import { useRef } from 'react';

export function usePickGallery() {
  let resolveRef = useRef<(selected: string[]) => void>(() => {});

  function onClose(selected: string[]) {
    resolveRef.current(selected);
  }

  function promptGallery() {
    return new Promise<string[]>((resolve) => {
      resolveRef.current = resolve;
    });
  }

  function closeGallery() {
    resolveRef.current([]);
  }

  return {
    promptGallery,
    closeGallery,
    galleryProps: {
      selectionMode: true,
      onClose,
    },
  };
}
