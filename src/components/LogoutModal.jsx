import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Card, Button, Typography, CardFooter } from "@material-tailwind/react";
import { logoutUser } from '../store/users/usersSlice';
import ModalConfirm from "./ModalConfirm";

export default function LogoutModal({ onClose }) {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(logoutUser()).then(response => {
            if (response.meta.requestStatus === 'fulfilled') {
                localStorage.removeItem('user'); 
                setModalMessage("Log out successful!");
                setShowModal(true);
            } else {
                setModalMessage("Log out failed!");
                setShowModal(true);
            }
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        window.location.reload();
    };

    return (
        <section className=" bg-gray-900 rounded-2xl fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <ModalConfirm isOpen={showModal} onClose={handleCloseModal} message={modalMessage} />
            <Card color="transparent" shadow={true} className="text-center bg-gray-700 p-7 rounded-2xl">
                <form className="sm:w-96 flex flex-col justify-between gap-4" onSubmit={handleSubmit}>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Are you sure you want to log out?
                        </Typography>
                    <CardFooter className="">
                        <Button className="" fullWidth type="submit">
                            Yes
                        </Button>
                        <Button className="mt-3" fullWidth type="button" onClick={onClose}>
                            No
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </section>
    );
}
