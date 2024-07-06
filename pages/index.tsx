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
    <div>
      <div>
        <h1 >Cat Catalog</h1>
        <ul>
          {breeds.map((breed) => (
            <li key={breed.id} >
              <Link href={`/breed/${breed.id}`} >
                {breed.name}
              </Link>
              <Link href={`/breed/${breed.id}`} >
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
