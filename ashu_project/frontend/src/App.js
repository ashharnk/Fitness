import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookClass from './pages/BookClass';
import Confirmation from './pages/Confirmation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-4">
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} key={Date.now()} />} />
            <Route path="/login" render={(props) => <Login {...props} key={Date.now()} />}  />
            <Route path="/signup" render={(props) => <Signup {...props} key={Date.now()} />}  />
            <Route path="/book/:classId" render={(props) => <BookClass {...props} key={Date.now()} />}  />
            <Route path="/confirmation" render={(props) => <Confirmation {...props} key={Date.now()} />}  />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
