"use client"
import { useRouter } from 'next/navigation';

export const Search = () => {
  const router = useRouter();
  
  // Check if router.query is defined before destructuring
  const query = router.query ? router.query.query : '';

  console.log(query); 

  return (
    <div>
      <h1>Search Results for: {query}</h1>
    </div>
  );
};

export default Search;
