import {useState, useEffect, useContext} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { StaticDataContext } from 'global/contexts/StaticDataContext';
import { ProductDataContext } from 'global/contexts/ProductsDataContext';
export const Filters = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { lang, langs } = useContext(StaticDataContext);
  const { categories } = useContext(ProductDataContext);
  const [priceFrom, setPriceFrom] = useState(searchParams.get('priceFrom') || '');
  const [priceTo, setPriceTo] = useState(searchParams.get('priceTo') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || '');

  const handlePrice = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    if (!value.match(/^\d*\.?\d*$/)) {
      return;
    }
    if (value.length > 0) {
      if (parseFloat(value) >= 10000 || 
        parseFloat(value) < 0
      ) {
        return;
      }
      if (value.includes('.')) {
        let arr = value.split('.');
        if (arr[1].length > 2) {
          return;
        }
      }
    }
    if (value.length > 0 && value[0] === '.') {
      value = '0' + value;
    }
    if (name === 'priceFrom') {
      if (parseFloat(value) > parseFloat(priceTo) && priceTo.length > 0) {
        return;
      }
      setPriceFrom(value);
    } else {
      setPriceTo(value);
    }
  }

  const checkPriceToRange = () => {
    if (parseFloat(priceTo) < parseFloat(priceFrom) && priceFrom.length > 0) {
      setPriceTo(parseFloat(priceFrom) + 1);
    }
  }
  
  const updateUrl = (key, value) => {
    let newSearchParams = new URLSearchParams(searchParams.toString());
    if (value.length > 0) {
      newSearchParams.set(key, value);
      newSearchParams.set('page', 1);
    } else {
      newSearchParams.delete(key);
    }
    setSearchParams(newSearchParams);
  }

  const handleSortBy = (e) => {
    let value = e.target.value;
    setSortBy(value);
    updateUrl('sortBy', value);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl('priceFrom', priceFrom);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceFrom]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl('priceTo', priceTo);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceTo]);

  useEffect(() => {
    if (!searchParams.get('priceFrom')) {
      setPriceFrom('');
    }
    if (!searchParams.get('priceTo')) {
      setPriceTo('');
    }
    if (!searchParams.get('sortBy')) {
      setSortBy('');
    }
  }, [searchParams]);
  return (
    <div className='col col-3 border-right'>
      <h2>{langs.search.filters}</h2>
      <div className='d-flex flex-column mt-3'>
      {categories.length > 0 ?
        categories.map((category, i) => (
          <Link className={`d-flex p-1 ${searchParams.get('category') === category ? 'active-cat' : ''}`}
            to={`/${lang}/search?category=${category}&page=1`}
            key={i}
          >
            {category}
          </Link>
        ))
        : null}
      </div>
      <div className='mt-3'>
        <h2 className='d-flex w-100'>{langs.search.price}</h2>
        <input 
          type='text'
          name='priceFrom'
          value={priceFrom}
          onChange={handlePrice}
          className='price-input'
          placeholder={langs.search.priceFromPlaceholder}
        />
        <input 
          type='text'
          name='priceTo'
          value={priceTo}
          onChange={handlePrice}
          className='price-input'
          placeholder={langs.search.priceToPlaceholder}
          onBlur={checkPriceToRange}
        />
      </div>
      <div className='d-flex flex-column mt-3'>
        <h2>{langs.search.sort}</h2>
        <select
          name='sortBy'
          value={sortBy}
          onChange={handleSortBy} 
        >
          <option value=''>{langs.search.sortBy}</option>
          <option value='price-asc'>{langs.search.sortBypriceASC}</option>
          <option value='price-desc'>{langs.search.sortBypriceDESC}</option>
          <option value='rating-rate'>{langs.search.sortByRatingRate}</option>
          <option value='rating-count'>{langs.search.sortByRatingCount}</option>
        </select>
      </div>
    </div>
  )
}