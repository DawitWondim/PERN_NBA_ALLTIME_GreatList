import React, { Fragment } from 'react';
import './App.css';
import CreateNewPlayer from './Components/CreateNewPlayer';
import ListPlayers from './Components/ListPlayers';


function App() {
  return (
<Fragment>
  <CreateNewPlayer/>
  <ListPlayers/>
</Fragment>
  );
}

export default App;
