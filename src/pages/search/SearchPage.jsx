import {
  useContext
} from 'react';
import { StaticDataContext } from 'global/contexts/StaticDataContext';
import { ProductDataContext } from 'global/contexts/ProductsDataContext';
import { Filters, Pagination } from './components';
import { SearchProductCard } from 'components/cards';
export const SearchPage = () => {
  const { langs } = useContext(StaticDataContext);
  const { products } = useContext(ProductDataContext);
  return (
    <div className='search d-flex row m-0 mt-4 px-3'>
      <h1 className='mb-2'>{langs.search.title}</h1>
      <Filters />
      <div className='col col-9'>
        {/* <Tags/> */}
        <div className='d-flex flex-wrap'>
          {products.length > 0 ?
            products.map((product, i) => (
              <SearchProductCard
                product={product}
                key={i}
              />
            ))
          : null}
          <Pagination />
        </div>
      </div>
    </div>
  );
}