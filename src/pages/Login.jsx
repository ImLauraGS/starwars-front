import React, { useEffect } from 'react'
import LoginModal from '../components/LoginModal'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      navigate('/');
    }
  }, []);
  
  return (
    <div>
        <main className='flex flex-col justify-center items-center align-middle'>
           <LoginModal /> 
        </main>
        
    </div>
  )
}
