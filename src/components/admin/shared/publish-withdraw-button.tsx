import Button, {ButtonProps} from "@mui/material/Button";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import SendIcon from "@mui/icons-material/Send";
import * as React from "react";

interface PublishWithdrawButtonProps {
    buttonProps: ButtonProps;

    action: () => void;

    published: boolean;
}

const PublishWithdrawButton: React.FC<PublishWithdrawButtonProps> = ({published, buttonProps, action}) => {
    return (
        <Button variant={published ? 'text' : 'contained'}
                color={published ? 'warning' : 'success'}
                startIcon={
                    published ? <CancelScheduleSendIcon fontSize="small"/> : <SendIcon fontSize="small"/>
                }
                onClick={action}
                {...buttonProps}
        >
            {published ? 'Withdraw ' : 'Publish'}
        </Button>
    );
};

export default PublishWithdrawButton;