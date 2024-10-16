"use client";

import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextField from "@/components/TextField";
import Image from "next/image";

interface IFormData {
    name: string;
    surname: string;
    year: string;
    portfolio: string;
    avatar: string;
}

const StudentForm: React.FC = () => {
    const [formData, setFormData] = React.useState<IFormData>({
        name: "",
        surname: "",
        year: "",
        portfolio: "",
        avatar: "https://via.placeholder.com/400"
    });
    const router = useRouter();

    useEffect(() => {
        const studentDataString = localStorage.getItem("student");
        if (studentDataString) {
            setFormData(JSON.parse(studentDataString));
        }
    }, []);

    const handleChange = useCallback(
        ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        },
        []
    );

    const generateAvatarUrl = useCallback((): void => {
        const seed = Math.random().toString(36).substring(2, 10);
        const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
        setFormData((prevState) => ({ ...prevState, avatar: avatarUrl }));
    }, []);

    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            console.log(formData);
            localStorage.setItem("student", JSON.stringify(formData));
            router.push("/");
        },
        [formData, router]
    );

    return (
        <div className="container mx-auto mt-5">
            <div className="flex justify-center">
                <div className="w-full max-w-md shadow-lg p-6">
                    <h3 className="mb-4 text-xl font-semibold">Student Form</h3>
                    <Image
                        src={formData.avatar}
                        alt="Avatar"
                        width={400}
                        height={400}
                        priority={true}
                        className="w-full h-auto"
                    />
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="avatar"
                            label="Student avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            onChangeAvatar={generateAvatarUrl}
                            error="test"
                        />
                        <TextField
                            name="name"
                            label="Student name"
                            value={formData.name}
                            onChange={handleChange}
                            error="test"
                        />
                        <TextField
                            name="surname"
                            label="Student surname"
                            value={formData.surname}
                            onChange={handleChange}
                            error="test"
                        />
                        <TextField
                            name="year"
                            label="Student year"
                            value={formData.year}
                            onChange={handleChange}
                            error="test"
                        />
                        <TextField
                            name="portfolio"
                            label="Student portfolio"
                            value={formData.portfolio}
                            onChange={handleChange}
                            error="test"
                        />
                        <button className="bg-blue-500 text-white py-2 px-4 rounded">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentForm;
