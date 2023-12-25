import { useContext, useState, useCallback, useEffect } from 'react';
import { CartDataContext } from 'global/contexts/CartDataContext';
import shopingCart from 'theme/images/shopping-cart.png';
export const AddToCartButton = ({ product }) => {
  const { isInCart, getQuantity, callUpdateCart } = useContext(CartDataContext);
  const [quantity, setQuantity] = useState(getQuantity(product.id));
  const handlePlus = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity]);
  const handleMinus = useCallback(() => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  }, [quantity]);

  useEffect(() => {
    if (!quantity || quantity === getQuantity(product.id)) return;
    console.log(quantity, getQuantity(product.id));
    const timer = setTimeout(() => {console.log('callUpdateCart');
      // callUpdateCart(product.id, quantity);
    }, 1000);
    return () => clearTimeout(timer);
  }, [quantity, product.id, callUpdateCart, getQuantity]);
  return (
    <div className="add-to-cart-container">
      {isInCart(product.id) ?
        <div className='quantity-container'>
          <button
            onClick={handleMinus}
            disabled={quantity === 1}
          >
          -
          </button>
          <span>{quantity}</span>
          <button
            onClick={handlePlus}
          >
          +
          </button>
          
        </div>
      :
      <button className='add-to-cart-button'>
        <img width="16" height="16" src={shopingCart} alt='cart' />
        Add to cart
      </button>
      }
    </div>
  )
}