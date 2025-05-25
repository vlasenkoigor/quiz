import { useRef, useState } from 'react';
import { ConfirmDialogProps } from '@/components/confirm-dialog';
export type SettleState = 'confirmed' | 'cancelled';

/**
 * Custom hook to manage a confirmation dialog.
 * It provides a function to show the dialog and returns the dialog properties.
 */
export function useDialog() {
  let resolveRef = useRef<(value: SettleState) => void>(() => {});

  const [open, setOpen] = useState(false);

  const [dialogProps, setDialogProps] = useState<Partial<ConfirmDialogProps>>({});

  function onClose() {
    setOpen(false);

    resolveRef.current('cancelled');
  }

  async function onConfirm() {
    setOpen(false);

    resolveRef.current('confirmed');
  }

  async function showDialog(rewriteProps?: Partial<ConfirmDialogProps>) {
    if (rewriteProps) {
      setDialogProps(rewriteProps);
    }

    return new Promise<SettleState>((resolve) => {
      resolveRef.current = resolve;

      setOpen(true);
    });
  }

  return {
    showDialog,

    dialogProps: {
      ...dialogProps,
      open,
      onClose,
      onConfirm,
    },
  };
}
