


export const themeOptions = {
    palette: {
        mode: 'light',
        primary: {
        main: '#963d5b',
        light: '#a61948',
        },
        secondary: {
        main: '#b73862',
        },
        background: {
        default: '#f9e3e3',
        },
        text: {
        primary: '#061C1C',
        secondary: '#5a1a1a',
        disabled: '#061C1C',
        },
        divider: 'rgba(216,25,25,0.12)',
    },
    typography: {
        fontWeightLight: 200,
        fontSize: 17,
        fontWeightRegular: 300,
    },
    shape: {
        borderRadius: 4,
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                    },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'text.primary',
                },
            },
        },
    },
},
},
},
};