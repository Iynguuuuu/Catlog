import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks'; // Custom hooks for Redux dispatch and state selector
import { useRouter } from 'next/router';
import { fetchBreedDetails } from '../../store/catSlice'; // Action to fetch cat breeds
import { RootState } from '../../store';
import Image from 'next/image';

const BreedDetails = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;

  const breed = useAppSelector((state: RootState) => state.cats.selectedBreed); // Select selected breed from Redux state
  const status = useAppSelector((state: RootState) => state.cats.status); // Select status from Redux state

  // Fetch breed details when ID changes
  useEffect(() => {
    if (id) {
      dispatch(fetchBreedDetails(id as string));
    }
  }, [id, dispatch]);

  // Display loading message while fetching data
  if (status === 'loading') {
    return <div className="flex text-4xl items-center justify-center h-screen">Loading... ⌛</div>
  }

  // Display error message if breed is not found
  if (!breed) {
    return <div className="flex text-4xl items-center justify-center h-screen">Breed not found 🚫</div>;
  }

  // Display breed details
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">{breed.name}</h1>
        <img
          className="w-[500px] h-[400px] object-cover mx-auto mb-4"
          src={`https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`}
          alt={breed.name}
        />
        <p className="text-lg mb-2"><span className='font-bold'>Origin:</span> {breed.origin}</p>
        <p className="text-lg mb-2"><span className='font-bold'>Life Span:</span> {breed.life_span} years</p>
        <p className="text-lg mb-2"><span className='font-bold'>Description </span><br />{breed.description}</p>
      </div>
    </div>
  );
};

export default BreedDetails;
