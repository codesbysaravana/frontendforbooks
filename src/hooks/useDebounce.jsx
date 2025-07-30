import React, { useEffect, useState } from 'react'

const useDebounce = ({ query, delay = 300 }) => {
  const [debouncedValue, setDebouncedValue] = useState(query);

  useEffect(() => {
    const mappedFinal = setTimeout((query) => {
        setDebouncedValue(query)
    }, delay)

    return () => clearTimeout(mappedFinal);
  }, [query, delay]);

    return debouncedValue;
}

export default useDebounce