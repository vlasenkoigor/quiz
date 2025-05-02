import {useAdminToolkit} from "@/components/admin/shared/AdminToolkitContext.tsx";

type RemoveWithConfirmationConfig = {
    entityName?: string;
    withToast?: boolean;
}
export const useRemoveWithConfirmation = (removeAction: () => Promise<void>, error: string | null, config?: RemoveWithConfirmationConfig) => {
    const {showSnackbar, showConfirmDialog} = useAdminToolkit();

    const {entityName = 'module', withToast} = config || {};

    const confirmRemove = async () => {
        const confirm = await showConfirmDialog({
            title: `Delete ${entityName}`,
            content: `Are you sure you want to delete this ${entityName}?`,
            cancelText: 'Cancel',
            confirmText: 'Delete',
        });

        if (confirm === 'cancelled') {
            return;
        }

        await removeAction();

        if (withToast){
            !error && showSnackbar('success', `${entityName} deleted successfully`);
        }
    }

     return {confirmRemove}
}