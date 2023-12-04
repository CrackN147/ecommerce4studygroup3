import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from 'global/routes';
import { languageList } from 'global/config';
import { StaticDataProvider } from 'global/contexts/StaticDataContext';
import {
  Header,
  Footer
} from './components';
import { ProductDataProvider } from 'global/contexts/ProductsDataContext';

const checkLanguage = () => {
  let windowUrl = window.location.href;
  let windowUrlArray = windowUrl.split('/');
  let index = languageList.indexOf(windowUrlArray[3]);
  if (index === -1) {
    window.location.href = `/${languageList[0]}`;
  }
}

checkLanguage();

const App = () => {
  return (
    <BrowserRouter>
      <StaticDataProvider>
        <ProductDataProvider>
          <Header />
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
          <Footer />
        </ProductDataProvider>
      </StaticDataProvider>
    </BrowserRouter>
  );
}

export default App;
