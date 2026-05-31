import { Theme } from './settings/types';
import { ShowcaseWebsite } from './components/generated/ShowcaseWebsite';

let theme: Theme = 'light';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  return <ShowcaseWebsite />;
}

export default App;
