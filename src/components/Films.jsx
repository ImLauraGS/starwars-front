import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Spinner,
} from "@material-tailwind/react";


export default function Films({ films, filmsLoading, error  }) {

    return (
        <>
            <h2 className='w-full border-y p-3 text-xl'>FILMS</h2>
            <section className='w-full h-full flex gap-5 p-5'>
                {filmsLoading && <Spinner className="h-12 w-12 m-auto" />}
                {error && <div className="text-red-500 text-center mt-5">Error: {error}</div>}
                {!filmsLoading && !error && films.length === 0 && (
                    <div className="text-center w-full">No films found for this starship.</div>
                )}
                {films.map((film, index) => {
                    const filmId = film.split('/').filter(Boolean).pop();
                    return (
                        <Card key={index} className="mt-6 rounded-xl">
                            <CardHeader color="blue-gray" className="relative h-56">
                                <img
                                    src={`https://starwars-visualguide.com/assets/img/films/${filmId}.jpg`}
                                    alt={film.title}
                                    className="h-full rounded-xl object-cover"
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {film.title}
                                </Typography>
                            </CardBody>
                        </Card>
                    );
                })}
            </section>
        </>
    );
};
