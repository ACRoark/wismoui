import { navigateAsync } from '../actions';

interface IApp {
  open: () => Promise<void>;
}

const App: IApp = {
  open: (): Promise<void> => navigateAsync('/'),
};

export default App;
