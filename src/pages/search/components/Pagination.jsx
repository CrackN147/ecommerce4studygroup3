import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductDataContext } from 'global/contexts/ProductsDataContext';
export const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pagination } = useContext(ProductDataContext);

  const handlePrev = () => {
    let newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', pagination.page - 1);
    setSearchParams(newSearchParams);
  }
  const handleNext = () => {
    let newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', pagination.page + 1);
    setSearchParams(newSearchParams);
  }
  const handlePageChange = (page) => {

    let newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', page);
    setSearchParams(newSearchParams);
  }
  console.log(pagination);
  return (
    <div className='pagination'>
      {pagination.page > 1 ?
        <button onClick={handlePrev} >
          Prev
        </button>
      : null}
      {Array.from({ length: Math.ceil(pagination.total / pagination.limit) }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          disabled={pagination.page === page}
          onClick={() => handlePageChange(page)}
          className={pagination.page === page ? 'active' : ''}
        >
          {page}
        </button>
      ))}
      {pagination.page < Math.ceil(pagination.total / pagination.limit) ? (
        <button onClick={handleNext}>
          Next
        </button>
      ): null}
    </div>
  )
};