import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useRouter } from 'next/router';
import { fetchBreedDetails } from '../../store/catSlice';
import { RootState } from '../../store';
import Image from 'next/image';

const BreedDetails = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;

  const breed = useAppSelector((state: RootState) => state.cats.selectedBreed);
  const status = useAppSelector((state: RootState) => state.cats.status);

  useEffect(() => {
    if (id) {
      dispatch(fetchBreedDetails(id as string));
    }
  }, [id, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!breed) {
    return <div>Breed not found</div>;
  }

  return (
    <div>
      <div>
        <h1>{breed.name}</h1>
        <img
        
          src={`https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`}
          alt={breed.name}
        />
        <p><span>Origin:</span> {breed.origin}</p>
        <p><span>Life Span:</span> {breed.life_span} years</p>
        <p><span>Description </span><br />{breed.description}</p>
      </div>
    </div>
  );
};

export default BreedDetails;
