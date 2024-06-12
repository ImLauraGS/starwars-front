import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Card, Input, Button, Typography, CardFooter } from "@material-tailwind/react";
import { loginUser } from '../store/users/usersSlice';
import ModalConfirm from "./ModalConfirm";
import { Link } from "react-router-dom";

export default function LoginModal() {

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData)).then(response => {
            if (response.meta.requestStatus === 'fulfilled') {
                localStorage.setItem('user', JSON.stringify(response.payload));
                setModalMessage("Log in successful!");
                setShowModal(true);
            } else {
                setModalMessage("Log in failed!");
                setShowModal(true);
            }
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        window.location.reload();
    };
    return (
        <div className="justify-center p-10 rounded-2xl mt-5">
            <ModalConfirm isOpen={showModal} onClose={handleCloseModal} message={modalMessage} />
            <Card color="transparent" shadow={false}>
                <Typography color="white" className="mt-1 font-normal text-center">
                    Hi! Enter your details to log in.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="white" className="-mb-3">
                            Your Email
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            color="white"
                            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                        <Typography variant="h6" color="white" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            color="black"
                            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>
                    <CardFooter className="pt-0">
                        <Button className="mt-6" fullWidth type="submit">
                            LOG IN
                        </Button>
                        <Typography color="white" className="mt-4 text-center font-normal">
                            Do not have an account?{" "}
                            <Link to="/register" className="font-bold text-lg">
                                SIGN UP
                            </Link>
                        </Typography>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
