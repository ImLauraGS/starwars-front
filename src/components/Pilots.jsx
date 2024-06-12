import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Spinner,
} from "@material-tailwind/react";
import { fetchPilots, setPilotsLoading, clearPilots } from '../store/starships/starshipSlice';

const Pilots = ({ starship }) => {
    const dispatch = useAppDispatch();
    const { pilots, pilotsLoading, error } = useAppSelector(state => state.starships);

    useEffect(() => {
        dispatch(clearPilots());

        if (starship.pilots && starship.pilots.length > 0) {
            if (starship.pilots) {
                dispatch(setPilotsLoading(true));
                starship.pilots.forEach(url => {
                    dispatch(fetchPilots(url));
                });
                dispatch(setPilotsLoading(false));
            }
        }
    }, [starship.pilots, dispatch]);
    
    return (
        <>
            <h2 className='w-full border-y p-3 text-xl'>PILOTS</h2>
            <section className='w-full h-full flex gap-5 p-5'>
                {pilotsLoading && <Spinner className="h-12 w-12 m-auto" />}
                {error && <div className="text-red-500 text-center mt-5">Error: {error}</div>}
                {!pilotsLoading && !error && pilots.length === 0 && (
                    <div className="text-center w-full">No pilots found for this starship.</div>
                )}
                {pilots.map((pilot, index) => {
                    const pilotId = pilot.url.split('/').filter(Boolean).pop();
                    return (
                        <Card key={index} className="mt-6 rounded-xl">
                            <CardHeader color="blue-gray" className="relative h-56">
                                <img
                                    src={`https://starwars-visualguide.com/assets/img/characters/${pilotId}.jpg`}
                                    alt={pilot.name}
                                    className="h-full rounded-xl object-cover"
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {pilot.name}
                                </Typography>
                            </CardBody>
                        </Card>
                    );
                })}
            </section>
        </>
    );
};

export default Pilots;
