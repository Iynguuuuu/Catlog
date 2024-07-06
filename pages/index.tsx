import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBreeds } from '../store/catSlice';
import Link from 'next/link';

const Home = () => {
  const dispatch = useAppDispatch();
  const breeds = useAppSelector((state) => state.cats.breeds);
  const status = useAppSelector((state) => state.cats.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBreeds());
    }
  }, [status, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 className="text-3xl font-bold text-yellow-500 mb-4" >Cat Catalog 🐱</h1>
        <ul>
          {breeds.map((breed) => (
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
