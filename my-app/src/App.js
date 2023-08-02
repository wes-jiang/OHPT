import logo from './logo.svg';
import { createTheme, ThemeProvider} from '@material-ui/core/styles';
import SendBtn from './components/SendBtn';
import './App.css';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
    </div>
  );
}

export default App;
