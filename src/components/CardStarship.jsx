import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { fetchStarships } from '../store/starships/starshipSlice';
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardBody,
    Typography,
    Button,
    Spinner,
} from "@material-tailwind/react";

const CardStarship = () => {
    const dispatch = useAppDispatch();
    const { starships, starshipsLoading, error, page, hasMore } = useAppSelector((state) => state.starships);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            navigate('/login');
        } else if (page === 1 && starships.results.length === 0) {
            dispatch(fetchStarships(page));
        }
    }, [dispatch, navigate, page, starships.results.length]);

    const handleClick = (id) => {
        navigate(`/starshipdetail/${id}`);
    };

    const loadMore = useCallback(() => {
        if (hasMore && !starshipsLoading) {
            dispatch(fetchStarships(page + 1));
        }
    }, [dispatch, hasMore, starshipsLoading, page]);

    return (
        <div className='flex flex-col w-full justify-center items-center'>
            <div className='flex flex-col w-full justify-center items-center'>
                {Array.isArray(starships.results) && starships.results.map((starship) => {
                    const id = starship.url.split('/').filter(Boolean).pop();
                    return (
                        <Card className="mt-6 w-[70%] bg-[#151515] p-5 rounded-xl" key={id} onClick={() => handleClick(id)}>
                            <CardBody>
                                <Typography color="white" variant="h4" className="mb-2">{starship.name}</Typography>
                                <Typography color="white">{starship.model}</Typography>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>
            {starshipsLoading && <Spinner className="h-12 w-12" />}
            {error && <div>Error: {error}</div>}
            {hasMore && !starshipsLoading && (
                <Button onClick={loadMore} style={{ display: 'block', margin: '20px auto' }}>
                    View More
                </Button>
            )}
        </div>
    );
};

export default CardStarship;
