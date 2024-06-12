import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Card, Input, Button, Typography, CardFooter } from "@material-tailwind/react";
import { registerUser } from '../store/users/usersSlice';
import ModalConfirm from "./ModalConfirm";
import { Link } from "react-router-dom";

export default function RegisterForm() {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [formData, setFormData] = useState({
        name: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(registerUser(formData));
            if (response.meta.requestStatus === 'fulfilled') {
                setModalMessage("Registration successful!");
                setShowModal(true);
            } else {
                setModalMessage(response.payload.error || "Registration failed!");
                setShowModal(true);
            }
        } catch (error) {
            setModalMessage("Registration failed! Please try again.");
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        window.location.reload();
    };

    return (
        <>

            <section className="justify-center p-10 rounded-2xl mt-5">

                <Card color="transparent" shadow={false}>
                    <ModalConfirm isOpen={showModal} onClose={handleCloseModal} message={modalMessage} />
                    <Typography color="white" className="mt-1 font-normal text-center">
                        Nice to meet you! Enter your details to register.
                    </Typography>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="white" className="-mb-3">
                                Your Name
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Your Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                color="white"
                                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
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
                                color="white"
                                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>
                        <Button className="mt-6" color="black" variant="filled" fullWidth type="submit">
                            SIGN UP
                        </Button>
                        <Typography color="white" className="mt-4 text-center font-normal">
                            Already have an account?{" "}
                            <Link to="/login" className="font-bold">
                                LOG IN
                            </Link>
                        </Typography>
                    </form>
                </Card>
            </section>
        </>
    );
}
