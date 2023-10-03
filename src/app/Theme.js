import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00477e",
      light: "#494f86",
      dark: "#33396d",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },

  },
  components: {
    MuiButton: { 
      styleOverrides: { 
        root: { 
          width: '10em',
          fontSize: "1em", 
          borderRadius: '0.5em'
       },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "0 auto",
          marginTop: "3em",
          "& .MuiOutlinedInput-root": {
            '& fieldset': {
              borderColor: 'white', // Border color
              color: 'white !important'
            },
            '&:hover fieldset': {
              borderColor: 'white', // Hovered border color
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white', // Focused border color
              color: 'white !important'
            },

          },
          '& .MuiInputLabel-root': {
            color: 'white !important', // Label color
          },
        },
      },
      defaultProps: {
        inputProps: {
          style: {
            borderColor: "rgba(255, 255, 255, 0.23)",
          },
        },
      },
    },
  }
});

export default theme;
