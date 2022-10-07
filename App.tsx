// import { store } from "./src/store";
import { Provider } from "react-redux";
import { store } from "./src/store";
import Index from "./Index";
export default function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}
