import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBreeds } from '../store/catSlice';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const dispatch = useAppDispatch();
  const breeds = useAppSelector((state) => state.cats.breeds);
  const status = useAppSelector((state) => state.cats.status);

  const [searchTerm, setSearchTerm] = useState(''); // State for search term


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBreeds());
    }
  }, [status, dispatch]);

  // Filter breeds based on search term
  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 className="text-3xl font-bold text-yellow-500 mb-4" >Cat Catalog 🐱</h1>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search breeds"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-full p-2 pl-10 w-full "
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>
        <ul>
          {filteredBreeds.map((breed) => (
            <li key={breed.id} className="border border-yellow-500 rounded-lg mb-2 p-4 flex justify-between items-center" >
              <Link href={`/breed/${breed.id}`} className="flex-grow text-left" >
                {breed.name}
              </Link>
              <Link href={`/breed/${breed.id}`} className="text-black ml-2" >
              ⮞
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
