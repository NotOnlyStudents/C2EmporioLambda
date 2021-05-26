import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#553C2A',
    },
    secondary: {
      main: '#F4511E',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },

});

export default theme;
