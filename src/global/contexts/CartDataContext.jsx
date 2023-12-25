import { createContext, useState, useEffect, useContext } from "react";
import moment from "moment";
import { ProductDataContext } from "global/contexts/ProductsDataContext";
import { getUserCart, updateCart } from "global/api/endpoints";
export const CartDataContext = createContext();

export const CartDataProvider = ({ children }) => {
  const { baseProducts } = useContext(ProductDataContext);
  const [cartID, setCartID] = useState();
  const [cart, setCart] = useState([]);

  const isInCart = (productId) => {
    let isInCart = cart.findIndex(item => item.id === productId);
    return isInCart !== -1;
  }

  const getQuantity = (productId) => {
    let index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      return cart[index].quantity;
    }
    return 1;
  }

  const callUpdateCart = async (productId, quantity) => {
    let index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      let newCart = [...cart];
      newCart[index].quantity = quantity;
      setCart(newCart);
      const apiUpdateCart = await updateCart(cartID, newCart);
      if (apiUpdateCart) {
        console.log(apiUpdateCart);
      }
    }
  }
  
  useEffect(() => {
    const fetchCart = async () => {
      const cart = await getUserCart();
      if (cart) {
        let resultProducts = cart[0].products.map(product => {
          let find = baseProducts.find(item => item.id === product.productId);
          return {
            ...product,
            ...find
          }
        });
        setCart(resultProducts);
        setCartID(cart[0].id);
      }
      // if (cart) {
      //   let newDate;
      //   let resultProducts = [];
      //   for (let i = 0; i < cart.length; i++) {
      //     let products = cart[i].products;
      //     let date = cart[i].date;
      //     if (products) {
      //       // eslint-disable-next-line no-loop-func
      //       products.forEach(product => {
      //         let isInResult = resultProducts.findIndex(item => item.productId === product.productId);
      //         let isNew = (newDate && moment(date) > moment(newDate));
      //         if (isInResult !== -1) {
      //           if (isNew) {
      //             resultProducts[isInResult] = product;
      //           }
      //         } else {
      //           resultProducts.push(product);
      //         }
      //       });
      //     }
      //     newDate = date;
      //   }
      //   resultProducts = resultProducts.map(product => {
      //     let find = baseProducts.find(item => item.id === product.productId);
      //     return {
      //       ...product,
      //       ...find
      //     }
      //   });
      //   setCart(resultProducts);
      // }
    }
    if (baseProducts.length > 0) {
      fetchCart();
    }
  }, [baseProducts]);
  return (
    <CartDataContext.Provider value={{
      cartID,
      cart,
      isInCart,
      getQuantity,
      callUpdateCart
    }}>
      {children}
    </CartDataContext.Provider>
  );
}