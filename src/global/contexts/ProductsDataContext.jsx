import {
  createContext,
  useState,
  useEffect
} from 'react';
import { useLocation } from 'react-router-dom';
import { getAllProducts, getAllCategories } from 'global/api/endpoints';
export const ProductDataContext = createContext();

export const ProductDataProvider = ({ children }) => {
  let location = useLocation();
  const [baseProducts, setBaseProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      if (products) {
        setBaseProducts(products);
      }
    }
    const fetchCategories = async () => {
      const categories = await getAllCategories();
      if (categories) {
        setCategories(categories);
      }
    }
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (location.pathname.includes('search')) {
      if (location.search) {
        const params = new URLSearchParams(location.search);
        let resultProducts = [...baseProducts];
        params.forEach((value, key) => {
          switch (key) {
            case 'category':
              resultProducts = resultProducts.filter(product => product.category === value);
              break;
            case 'priceFrom':
              if (!parseFloat(value)) {
                return;
              }
              resultProducts = resultProducts.filter(product => product.price >= parseFloat(value));
              break;
            case 'priceTo':
              if (!parseFloat(value)) {
                return;
              }
              resultProducts = resultProducts.filter(product => product.price <= parseFloat(value));
              break;
            case 'sortBy':
              switch (value) {
                case 'price':
                  resultProducts.sort((a, b) => a.price - b.price);
                  break;
                case 'rating':
                  resultProducts.sort((a, b) => b.rate - a.rate);
                  break;
                default:
                  break;
              }
              break;
            default:
              break;
          }
        });
        setProducts(resultProducts);
      } else {
        setProducts(baseProducts);
      }
    }
  }, [location, baseProducts]);

  return (
    <ProductDataContext.Provider value={{
      products,
      categories,
      baseProducts
    }}>
      {children}
    </ProductDataContext.Provider>
  );
}