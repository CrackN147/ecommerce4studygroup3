import { useContext } from "react";
import { Link } from "react-router-dom";
import { StaticDataContext } from "global/contexts/StaticDataContext";
import { AddToCartButton } from "components";
export const SearchProductCard = ({ product }) => {
  const { lang, langs } = useContext(StaticDataContext);
  return (
    <div className='d-flex justify-content-center align-items-center search-product-card'>
      <Link to={`/${lang}/product/${product.id}`}
        className="home-product-card d-flex justify-content-center align-items-center"
      >
        <img src={product.image} alt={product.name} />
        <h3 className="text-overflow-clamp">{product.title}</h3>
        <p>{langs.product.price}: {product.price} $</p>
        <p>{langs.product.rate}: {product.rating.rate}/{product.rating.count}</p>
      </Link>
      <AddToCartButton
        product={product}
      />
    </div>
  );
}