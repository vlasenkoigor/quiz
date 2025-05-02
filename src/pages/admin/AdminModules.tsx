import {
    Box,
    Stack,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import ModulesTable from "@/components/admin/ModulesTable.tsx";
import {useAdminModuleList} from "@/providers/admin-module-list-context.tsx";
import AddModuleDialog from "@/components/admin/AddModuleDialog.tsx";
import {useDialog} from "../../hooks/use-dialog.ts";
import LoadingCircleBox from "../../components/shared/LoadingCircleBox.tsx";
import LoadingCircleBackdrop from "../../components/shared/LoadingCircleBackdrop.tsx";
import {useEffect} from "react";
import {useAdminToolkit} from "../../components/admin/shared/AdminToolkitContext.tsx";

export function AdminModules() {
    const {loading, mutating, error, modules, addModule, changeOrder} = useAdminModuleList();

    const {showDialog: showAddModuleDialog, dialogProps} = useDialog();

    const {showSnackbar} = useAdminToolkit();

    // listen to global error
    useEffect(() => {
        if (error) {
            showSnackbar('error', error);
        }
    }, [error])

    console.log('render', loading, modules)

    return (
        <>
            <LoadingCircleBackdrop open={mutating}/>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'center'
            }}>
                <Stack width={1} direction='row' justifyContent='space-between' sx={{py: 2}}>
                    <Typography variant="h4" component='div' fontWeight={'bold'} align='left'
                                sx={{alignSelf: 'start'}}>Modules</Typography>

                    <Button variant="contained" color='info' startIcon={<AddBoxSharpIcon/>}
                            onClick={() => showAddModuleDialog()}>
                        Add module
                    </Button>
                </Stack>

                {loading ? <LoadingCircleBox open={loading}/> :
                    <>
                        <ModulesTable modules={modules} disabled={mutating} changeOrder={changeOrder}/>
                        <AddModuleDialog  {...dialogProps} createModule={addModule}/>
                    </>}
            </Box>
        </>
    )
}


