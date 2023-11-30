import {
  useState,
  useEffect
} from 'react';
import { getAllProducts } from 'global/api/endpoints';
import { Carousel, HomeProductCard } from 'components';
export const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      if (products) {
        setProducts(products);
      }
    }
    fetchProducts();
  }, []);
  return (
    <div className='row m-0 py-5 px-2'>
      {products.length > 0 ?
        <Carousel>
          {products.map((product, index) => (
            <HomeProductCard 
              key={`home-product-card-${index}`} 
              product={product} 
            />
          ))}
        </Carousel>
        : null}
    </div>
  );
}