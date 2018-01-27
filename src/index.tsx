import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { RootState } from "./types/index";
import ReduxThunk from "redux-thunk";

const configureStore = (initialState?: RootState) => {
  return createStore(
    reducers,
    initialState!,
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
};
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
