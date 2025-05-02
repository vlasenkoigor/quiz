import Button, {ButtonProps} from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import {FC} from "react";

// admin delete button
interface DeleteButtonProps {
    buttonProps?: ButtonProps;

    action: () => void;

    text? : string;
}

const DeleteButton: FC<DeleteButtonProps> = ({action, text, buttonProps}) => {
    return (
        <Button variant="contained" color='error' startIcon={<DeleteIcon/>} onClick={action} {...buttonProps}  >
            {text ? text : 'Delete'}
        </Button>
    );
};

export default DeleteButton;