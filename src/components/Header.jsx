import React, { useState } from 'react';
import NavbarBottom from './NavbarBottom';
import LogoutModal from './LogoutModal';
import { Link } from 'react-router-dom';


export default function Header() {
    const [activeModal, setActiveModal] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const userData = JSON.parse(localStorage.getItem('user'));

    const handleShowLogout = () => {
        setActiveModal('logout');
    }

    const handleCloseModal = () => {
        setActiveModal(null);
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <header className='flex flex-col w-full items-center justify-center'>
            <div className='flex justify-between p-4 md:p-10 w-full items-center'>
            <ul className='hidden md:flex items-center gap-4 w-[30%]'>
                        <li><img src="/facebook.svg" alt="facebook icon" className='w-6' /></li>
                        <li><img src="/mdi_twitter.svg" alt="twitter icon" className='w-6' /></li>
                </ul>
                <button onClick={toggleMenu} className='md:hidden focus:outline-none'>
                    <img src="/menu-icon.svg" alt="menu icon" className='w-8' />
                </button>
                <Link to="/" className='text-center md:flex-grow-0'>
                    <img className='w-32 md:w-[12rem]' src="/logo.png" alt="logo" />
                </Link>
                <ul className='hidden md:flex w-[30%] justify-end gap-10'>
                    {userData && userData.user_id ? (
                        <li onClick={handleShowLogout} className="cursor-pointer">LOG OUT</li>
                    ) : (
                        <>
                            <li className="cursor-pointer">
                                <Link to="/login">LOG IN</Link>
                            </li>
                            <li className="cursor-pointer">
                                <Link to="/register">SIGN IN</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            {isMenuOpen && (
                <div className='flex items-center gap-4 w-[30%]'>
                    <ul className='flex flex-col items-center gap-4 p-4'>
                        <li><img src="/facebook.svg" alt="facebook icon" className='w-6' /></li>
                        <li><img src="/mdi_twitter.svg" alt="twitter icon" className='w-6' /></li>
                        {userData && userData.user_id ? (
                            <li onClick={handleShowLogout} className="cursor-pointer">LOG OUT</li>
                        ) : (
                            <>
                                <li className="cursor-pointer">
                                    <Link to="/login">LOG IN</Link>
                                </li>
                                <li className="cursor-pointer">
                                    <Link to="/register">SIGN IN</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
            <NavbarBottom />
            {activeModal === 'logout' && <LogoutModal onClose={handleCloseModal} />}
        </header>
    );
}
