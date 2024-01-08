import { useContext, useState, useCallback, useEffect } from 'react';
import { CartDataContext } from 'global/contexts/CartDataContext';
import { UserDataContext } from 'global/contexts/UserDataContext';
import shopingCart from 'theme/images/shopping-cart.png';
export const AddToCartButton = ({ product }) => {
  const { isUser } = useContext(UserDataContext);
  const { isInCart, getQuantity, callUpdateCart } = useContext(CartDataContext);
  const [quantity, setQuantity] = useState();
  const handlePlus = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity]);
  const handleMinus = useCallback(() => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  }, [quantity]);

  const addProductToCart = useCallback(() => {
    setQuantity(1);
    callUpdateCart(product.id, 1);
  }, [callUpdateCart, product.id]);

  useEffect(() => {
    if (isInCart(product.id)) {
      setQuantity(getQuantity(product.id));
    }
  }, [product.id, isInCart, getQuantity]);

  useEffect(() => {
    if (!quantity || quantity === getQuantity(product.id)) return;
    const timer = setTimeout(() => {console.log('callUpdateCart');
      callUpdateCart(product.id, quantity);
    }, 1000);
    return () => clearTimeout(timer);
  }, [quantity, product.id, callUpdateCart, getQuantity]);

  return !isUser ? <></> : (
    <div className="add-to-cart-container">
      {(isInCart(product.id) && quantity) ?
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
      <button className='add-to-cart-button'
        onClick={addProductToCart}
      >
        <img width="16" height="16" src={shopingCart} alt='cart' />
        Add to cart
      </button>
      }
    </div>
  )
}