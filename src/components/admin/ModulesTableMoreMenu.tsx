import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import SendIcon from '@mui/icons-material/Send';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import { useAdminModuleList } from '@/providers/admin-module-list-context';
import { useAdminToolkit } from './shared/AdminToolkitContext';
import { Link as RouterLink } from 'react-router';
import { usePublishWithdrawWithConfirmation } from '@/hooks/admin/use-publish-withdraw-with-confirmation';
import { type TModule } from '@/data/module/module-api';

interface ModulesTableMoreMenuProps {
  module: TModule;
}

const ModulesTableMoreMenu: React.FC<ModulesTableMoreMenuProps> = ({ module }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { removeModule, publishModule, error } = useAdminModuleList();

  const { showConfirmDialog, showSnackbar } = useAdminToolkit();

  const publish = () => publishModule(module.id, true);

  const withdraw = () => publishModule(module.id, false);

  const { publishOrWithdraw } = usePublishWithdrawWithConfirmation(module.published, publish, withdraw, error);

  const onRemoveClick = async () => {
    handleClose();

    const confirm = await showConfirmDialog({
      title: 'Delete Module',
      content: 'Are you sure you want to delete this module?',
      cancelText: 'Cancel',
      confirmText: 'Delete',
    });

    if (confirm === 'cancelled') {
      return;
    }

    await removeModule(module.id);

    !error && showSnackbar('success', 'Module deleted successfully');
  };

  const onPublishClick = async () => {
    handleClose();

    publishOrWithdraw();
  };

  const onPreviewClick = () => {
    handleClose();
  };

  return (
    <>
      <IconButton aria-label="more" id="long-button" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        onClose={handleClose}
        sx={{ '& .MuiPaper-root': { minWidth: 190 } }}
      >
        <MenuList>
          <MenuItem onClick={onRemoveClick}>
            <ListItemIcon>
              <DeleteIcon color={'warning'} fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
          <MenuItem component={RouterLink} to={module.id}>
            <ListItemIcon>
              <EditIcon color={'info'} fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={onPublishClick}>
            <ListItemIcon>
              {module.published ? (
                <CancelScheduleSendIcon color="warning" fontSize="small" />
              ) : (
                <SendIcon color={'info'} fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>{module.published ? 'Withdraw ' : 'Publish'}</ListItemText>
          </MenuItem>
          <MenuItem onClick={onPreviewClick}>
            <ListItemIcon>
              <PreviewIcon color={'info'} fontSize="small" />
            </ListItemIcon>
            <ListItemText>Preview</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default ModulesTableMoreMenu;
