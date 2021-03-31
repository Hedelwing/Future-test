import React from 'react';
import Main from './components/Main';
import { Container, CssBaseline } from '@material-ui/core'
import { reducer, defaultValue } from './store/reducer';
import Context from './store/context';

function App() {
  const payload = React.useReducer(reducer, defaultValue)

  return <Context.Provider value={payload}>
    <CssBaseline />
    <Container maxWidth="lg">
      <Main />
    </Container>
  </Context.Provider >
}

export default App;
