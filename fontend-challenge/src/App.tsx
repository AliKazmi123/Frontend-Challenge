import React, { FC } from 'react';
import MainRouter from './routes/routes';
import { connect, Provider } from "react-redux";
import { store } from './redux/store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <MainRouter />
      </div>
    </Provider>

  );
}

export default App;
