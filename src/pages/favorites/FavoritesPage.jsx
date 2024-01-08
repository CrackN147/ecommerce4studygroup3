import { useContext, useEffect, useState } from "react";
import { FavsDataContext } from "global/contexts/FavsDataContext";
import { ProductDataContext } from "global/contexts/ProductsDataContext";
import { Sidebar } from "components";
import { FavsProductCard } from "components";
export const FavoritesPage = () => {
  const { favs } = useContext(FavsDataContext);
  const { baseProducts } = useContext(ProductDataContext);
  const [ data, setData ] = useState([]);
  
  useEffect(() => {
    if (baseProducts.length > 0 && favs.length > 0) {
      let list = baseProducts.filter(p => favs.includes(p.id))
      if (list.length > 0) {
        setData(list);
      }
    }
  }, [baseProducts, favs]);

  
  return (
    <div className='row d-flex mx-2 my-4'>
      <Sidebar />
      <div className='col col-9 in-user-page'>
        <div className='d-flex flex-wrap'>
          {data.length > 0 ?
            data.map((product, i) => (
              <FavsProductCard
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