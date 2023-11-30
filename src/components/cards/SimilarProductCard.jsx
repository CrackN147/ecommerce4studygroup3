import { useContext } from "react";
import { Link } from "react-router-dom";
import { StaticDataContext } from "global/contexts/StaticDataContext";
export const SimilarProductCard = ({ product }) => {
  const { lang, langs } = useContext(StaticDataContext);
  return (
    <Link to={`/${lang}/product/${product.id}`} 
      className="d-flex justify-content-center align-items-center"
    >
      <div className='home-product-card d-flex justify-content-center align-items-center'>
        <img src={product.image} alt={product.name} />
        <h3 className="text-overflow-clamp">{product.title}</h3>
        <p>{langs.product.price}: {product.price} $</p>
      </div>
    </Link>
  );
}