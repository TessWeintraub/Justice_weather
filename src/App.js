
import './App.css';
import Main from './components/Main/Main';
import {Provider} from "react-redux";
import {store} from './redux'

function App() {
  return (
      <Provider store={store}>
          <div className="app wrapper">
              <Main/>
          </div>
      </Provider>
  );
}

export default App;
