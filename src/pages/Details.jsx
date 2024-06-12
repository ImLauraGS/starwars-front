import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import {
    fetchStarshipDetails,
    fetchStarshipImg,
    clearPilots,
    clearFilms,
} from '../store/starships/starshipSlice';
import {
    Typography,
    Spinner,
} from "@material-tailwind/react";
import Pilots from '../components/Pilots';
import Films from '../components/Films';

const Details = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { starship, images, loading } = useAppSelector(state => state.starships);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(clearPilots());
            dispatch(clearFilms());
            dispatch(fetchStarshipDetails(id));
            dispatch(fetchStarshipImg(id));
        }
    }, [dispatch, id]);

    const imageUrl = images[id] || '/big-placeholder.jpg';

    return (
        <>
            <main className='w-full flex flex-col'>
                <h2 className='w-full border-b p-3 text-xl'>STARSHIPS</h2>
                {loading && <Spinner className="h-12 w-12 m-auto" />}
                <section className='w-full flex justify-between items-stretch p-5 rounded-2xl'>
                    <div className='w-[40%]'>
                        <img src={imageUrl} className='w-full h-[100%] object-cover' alt={starship?.name} />
                    </div>
                    {starship && (
                        <div className='flex flex-col w-[60%] bg-[#151515] justify-center rounded-r-2xl p-5'>
                            <Typography variant="h2" color="white" className='border-b-2'>{starship.name}</Typography>
                            <Typography>Model: {starship.model}</Typography>
                            <Typography>Manufacturer: {starship.manufacturer}</Typography>
                            <Typography>Cost in credits: {starship.cost_in_credits}</Typography>
                            <Typography>Length: {starship.length}</Typography>
                            <Typography>Max atmosphering speed: {starship.max_atmosphering_speed}</Typography>
                            <Typography>Crew: {starship.crew}</Typography>
                            <Typography>Passengers: {starship.passengers}</Typography>
                            <Typography>Cargo capacity: {starship.cargo_capacity}</Typography>
                            <Typography>Consumables: {starship.consumables}</Typography>
                            <Typography>Hyperdrive rating: {starship.hyperdrive_rating}</Typography>
                            <Typography>MGLT: {starship.MGLT}</Typography>
                            <Typography>Starship class: {starship.starship_class}</Typography>
                        </div>
                    )}
                </section>
                {starship && (
                    <>
                        <Pilots starship={starship} />
                        <Films starship={starship} />
                    </>
                )}
            </main>
        </>
    );
};

export default Details;
