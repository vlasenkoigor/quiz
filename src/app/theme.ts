import { PaletteColorOptions, createTheme, responsiveFontSizes  } from "@mui/material";
import {common} from "@mui/material/colors";

declare module "@mui/material/styles" {
    interface PaletteOptions {
        white: PaletteColorOptions;
        someMore: PaletteColorOptions;
    }
}

declare module "@mui/material/Button" { // <-- Added `/Button` here
    interface ButtonPropsColorOverrides {
        white: true;
        someMore: true;
    }
}
    export const theme = responsiveFontSizes(createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },

    components: {
        MuiTextField: {
            styleOverrides : {
                root : {
                    backgroundColor : common.white,
                    borderRadius : '4px'

                },
            }
        },


        MuiButton: {
            defaultProps: {
                disableTouchRipple: true,
            },
            styleOverrides:{
                root : {
                    whiteSpace: 'nowrap',
                    // overflow: 'hidden',
                }
            }
        }
    },
    palette: {
        primary: {
            main: '#8d4314',
        },

        background: {

            paper : '#f5f5f5'
            // default: '#83ff03',s
        },
        secondary: {
            main: '#ffd009',
        },


        white: {
            main: '#ffffff'
        },

        someMore: {
            main: 'rgb(59,57,57)',

        }
    },
}));