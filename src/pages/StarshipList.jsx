import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CardStarship from '../components/CardStarship';
import LoginModal from '../components/LoginModal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function StarshipList() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
    }
  }, []);



  return (
    <>
      <CardStarship />
    </>
  );
}
