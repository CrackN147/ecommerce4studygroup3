import { useContext } from "react";
import { CartDataContext } from "global/contexts/CartDataContext";
import { Sidebar } from "components";
import { CartProductCard } from "components";
export const CartPage = () => {
  const { cart } = useContext(CartDataContext);
  
  
  return (
    <div className='row d-flex mx-2 my-4'>
      <Sidebar />
      <div className='col col-9 in-user-page'>
        <div className='d-flex flex-wrap'>
          {cart.length > 0 ?
            cart.map((product, i) => (
              <CartProductCard
                product={product}
                key={i}
              />
            ))
            : null}
        </div>
      </div>
    </div>
  );
}