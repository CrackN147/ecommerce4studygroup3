import { useContext } from "react";
import { Link } from "react-router-dom";
import { StaticDataContext } from "global/contexts/StaticDataContext";
export const HomeProductCard = ({ product }) => {
  const { lang } = useContext(StaticDataContext);
  return (
    <Link to={`/${lang}/product/${product.id}`}>
      <div className='home-product-card'>
        <img src={product.image} alt={product.name} />
        <h3 className="text-overflow-clamp">{product.title}</h3>
        <p>{product.price} $</p>
      </div>
    </Link>
  );
}