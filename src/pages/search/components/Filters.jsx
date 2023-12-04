import {useContext} from 'react';
import { Link } from 'react-router-dom';
import { StaticDataContext } from 'global/contexts/StaticDataContext';
import { ProductDataContext } from 'global/contexts/ProductsDataContext';
export const Filters = () => {
  const { lang, langs } = useContext(StaticDataContext);
  const { categories } = useContext(ProductDataContext);
  return (
    <div className='col col-3'>
      <h2>{langs.search.filters}</h2>
      <div className='d-flex flex-column mt-3'>
      {categories.length > 0 ?
        categories.map((category, i) => (
          <Link className='d-flex p-1' 
            to={`/${lang}/search?category=${category}`}
            key={i}
          >
            {category}
          </Link>
        ))
        : null}
      </div>
      <div className='d-flex flex-column mt-3'>
        <h2>{langs.search.price}</h2>
        <input type='text' />
        <input type='text' />
      </div>
      <div className='d-flex flex-column mt-3'>
        <h2>{langs.search.sort}</h2>
        <select>
          <option value=''>{langs.search.sortByprice}</option>
          <option value=''>{langs.search.sortByrating}</option>
        </select>
      </div>
    </div>
  )
}