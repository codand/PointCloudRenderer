
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  clearbox: {
    background: 'linear-gradient(45deg, #573950 30%, #4d2c1a 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    padding: '10px 30px',
    position: 'absolute',
    left: '3em',
    top: '3em',
    opacity: 0.8,
  },
  timeline: {
    position: 'absolute',
    bottom: '3em',
    padding: '0 3em 0 3em',
    width: '100%',
  },
  tooltip: {
    position: 'absolute',
    bottom: '0.5em',
    right: '0.5em',
  },
  controls: {
    position: 'absolute',
    bottom: '6em',
    left: "2em"
  }
}));

export default useStyles;