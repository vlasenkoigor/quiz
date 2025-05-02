import React from 'react';
import Box from "@mui/material/Box";

interface BlackedOverlayProps {
    withDot?: boolean;
}

const BlackedOverlay: React.FC<React.PropsWithChildren<BlackedOverlayProps>> = ({withDot = false, children}) => {
    return (
        <Box sx={{
            position: 'absolute',
            width: 1,
            height: 1,
            backgroundImage : `linear-gradient(90deg,rgba(31,31,31,.5) .2%,hsla(0,0%,6%,.5) 100%)${withDot ? ',url(dot.png)' : ''}`,
        }}>
            {children}
        </Box>

    );
};

export default BlackedOverlay;