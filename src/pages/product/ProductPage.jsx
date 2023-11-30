import {
  useState,
  useEffect,
  useContext
} from 'react';
import { useParams } from 'react-router-dom';
import {
  getProductById,
  getProductsByCategory
} from 'global/api/endpoints';
import { StaticDataContext } from 'global/contexts/StaticDataContext';
import { SimilarCarousel, SimilarProductCard } from 'components';
export const ProductPage = () => {
  const { lang, langs } = useContext(StaticDataContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductById(productId);
      if (product) {
        setProduct(product);
      }
    }
    fetchProduct();
  }, [productId]);
  useEffect(() => {
    const fetchSimilarProducts = async () => {
      const products = await getProductsByCategory(product.category);
      if (products) {
        setSimilarProducts(products);
      }
    }
    if (product) {
      fetchSimilarProducts();
    }
  }, [product]);
  return (
    <div className='row m-0 py-5 px-2'>
      {product ?
        <>
          <div className='product-full row'>
            <div className='col col-6'>
              <h1>{product.title}</h1>
              <img src={product.image} alt={product.title} />
            </div>
            <div className='col col-6'>
              <p><span>{langs.product.price}:</span> {product.price} $</p>
              <p><span>{langs.product.category}:</span> {product.category}</p>
              <p><span>{langs.product.rate}:</span> {product.rating.count} {product.rating.rate}</p>
              <p><span>{langs.product.description}:</span></p>
              <p>{product.description}</p>
            </div>
          </div>
          <div className='row m-0 py-5'>
            <div className='col col-12 p-0'>
              <h3>{langs.product.similar}</h3>
              <div className='row m-0'>
                <SimilarCarousel
                  sliderClassName='px-5'
                >
                  {similarProducts.map((product, index) => (
                    <SimilarProductCard
                      key={`similar-product-${index}`}
                      product={product}
                    />
                  ))}
                </SimilarCarousel>
              </div>
            </div>
          </div>
        </>
        : <p>{langs.common.productNotFound}</p>}
    </div>
  );
}