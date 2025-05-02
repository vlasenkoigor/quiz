import React from 'react';
import {Box} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingCircleBoxProps {
    open: boolean;
}
const LoadingCircleBox: React.FC<LoadingCircleBoxProps> = ({open}) => {
    return (
        open ?  <Box sx={{
            width: 1,
            height: 1,
            p: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center'
        }}><CircularProgress/></Box> : null
    );
};

export default LoadingCircleBox;