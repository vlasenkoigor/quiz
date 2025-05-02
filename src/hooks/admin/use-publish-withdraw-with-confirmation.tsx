import {useAdminToolkit} from "@/components/admin/shared/AdminToolkitContext.tsx";

export const usePublishWithdrawWithConfirmation = (published: boolean, publish: () => Promise<void>, withdraw: () => Promise<void>, error: string | null, config? : {entityName? : string})=> {
    const {showConfirmDialog, showSnackbar} = useAdminToolkit();

    const {entityName = 'module'} = config || {};

    const publishOrWithdraw = async () => {
        const confirm = await showConfirmDialog({
            title: published ? `Withdraw ${entityName}` : `Publish ${entityName}`,
            content: published ? `Are you sure you want to withdraw this ${entityName}?` : `Are you sure you want to publish this ${entityName}?`,
            cancelText: 'Cancel',
            confirmText: published ? 'Withdraw' : 'Publish',
        });

        if (confirm === 'cancelled') {
            return;
        }

        await (published ? withdraw() : publish());

        !error && showSnackbar('success', published ? `${entityName} withdrawn successfully and no longer appear for users` : `${entityName}  published successfully`);
    }

    return { publishOrWithdraw }
}


