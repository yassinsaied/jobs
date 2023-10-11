import { BrowserRouter } from 'react-router-dom';

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}
