import { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams } from "react-router-dom";
import { ProductDataContext } from 'global/contexts/ProductsDataContext';
import { StaticDataContext } from 'global/contexts/StaticDataContext';
import search from 'theme/images/search.png';
export const SearchBar = () => {
  let [searchParams] = useSearchParams();
  const { lang } = useContext(StaticDataContext);
  const { baseProducts, categories } = useContext(ProductDataContext);
  const [searchValue, setSearchValue] = useState(searchParams.get('keyword') || '');
  const [suggestions, setSuggestions] = useState({
    products: [],
    categories: []
  });

  const changeValue = (e) => {
    let value = e.target.value;
    setSearchValue(value)
  }

  const onFormSubmit = () => {
    setSuggestions({
      products: [],
      categories: []
    })
  }

  const resetVars = () => {
    setTimeout(() => {
      setSearchValue('')
      setSuggestions({
        products: [],
        categories: []
      })
    }, 200)
  }

  useEffect(() => {
    // console.log(searchValue, baseProducts, categories)
    if (searchValue && baseProducts && categories && 
      searchValue.length >= 2 && searchValue !== searchParams.get('keyword')
    ) {
      let productList = baseProducts.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()));
      let categoryList = categories.filter(category => category.toLowerCase().includes(searchValue.toLowerCase()));
      setSuggestions({
        products: productList,
        categories: categoryList
      })
    } else {
      setSuggestions({
        products: [],
        categories: []
      })
    }
  }, [searchValue, baseProducts, categories, searchParams])

  return (
    <div className='search-container d-flex justify-content-center align-items-center col col-4'>
      <form method='GET' action={`/${lang}/search`} className='w-100' autoComplete='off'>
        <input
          name='keyword'
          type="text"
          value={searchValue}
          onChange={changeValue}
          onBlur={resetVars}
          placeholder='Search'
          required
        />
        <button
          type="submit"
          onClick={onFormSubmit}
        >
          <img src={search} alt='search' />
        </button>
      </form>
      {(suggestions.products.length > 0 || suggestions.categories.length > 0) ?
        <div className='search-results'>
          {suggestions.categories.length > 0 ?
            <div className='search-result-container'>
              <h3>Categories</h3>
              {suggestions.categories.map((suggestion, index) => (
                <Link to={`/${lang}/search?category=${suggestion}`} key={index}
                >
                  {suggestion}
                </Link>
              ))}
            </div>
            : null}
          {suggestions.products.length > 0 ?
            <div className='search-result-container'>
              <h3>Products</h3>
              {suggestions.products.map((suggestion, index) => (
                <Link to={`/${lang}/product/${suggestion.id}`} key={index}
                >
                  {suggestion.title}
                </Link>
              ))}
            </div>
            : null}
        </div>
        : null}
    </div>
  );
}