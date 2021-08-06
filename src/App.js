import './App.css';
import { Home } from './pages/home.js';
import Register from './pages/Register';
import Login from './pages/login'
// import { LoggedContext } from './context'
import Topic from './pages/topic'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'


const NotFound = () => {
  return (
    <div className="home">
      <p>
        NOT FOUND 404
        <br />
        return to <a href='/'> HomePage </a> ?
      </p>
    </div>
  );
}





const ProtectedRoute = (Page) => {
  let logged = localStorage.getItem('logged');
  if (logged) return Page
  return NotFound
}

const App = () => {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={(Login)} />
          <Route exact path="/home" component={ProtectedRoute(Home)} />
          <Route exact path="/register" component={Register} />
          <Route path="/topic/:id" component={ProtectedRoute(Topic)} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
