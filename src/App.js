import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Main from './components/Main';


const App = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography style={{ paddingLeft: '18px' }} variant="h6" color="inherit">
            Rave file generator
          </Typography>
        </Toolbar>
      </AppBar>
      <Main />
    </div>
  );
}

export default App;
