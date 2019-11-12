import React from 'react';
import './App.css';
import Nav from './Components/Nav/Nav'
import routes from './routes'
import {withRouter} from 'react-router'

// https://github.com/DevMountain/simulation-3 dirrections

function App(props) {
  // console.log(props.location.pathname);
  
  const hideNav = () => {
    if(props.location.pathname !== '/'){
      return(
        <Nav/>
      )
    }
  }

  return (
    <div className="App">
      {hideNav()}
      {routes}
    </div>
  );
}


export default  withRouter(App)
