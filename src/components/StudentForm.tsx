"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@/components/TextField";
import Image from "next/image";
import { validator } from "@/utils/validator";
import _ from "lodash";

interface IFormData {
    name: string;
    surname: string;
    year: string;
    portfolio: string;
    avatar: string;
}

type IErrors = Partial<Record<keyof IFormData, string>>;

const StudentForm: React.FC = () => {
    const [formData, setFormData] = useState<IFormData>({
        name: "",
        surname: "",
        year: "",
        portfolio: "",
        avatar: "https://via.placeholder.com/400"
    });
    const [errors, setErrors] = useState<IErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const studentDataString = localStorage.getItem("student");
        if (studentDataString) {
            setFormData(JSON.parse(studentDataString));
        }
    }, []);

    const validateConfig = useMemo(
        () => ({
            name: { isRequired: { message: "Field is required" } },
            surname: { isRequired: { message: "Field is required" } },
            year: { isRequired: { message: "Field is required" } },
            portfolio: { isRequired: { message: "Field is required" } },
            avatar: {}
        }),
        []
    );

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

    const validate = useCallback(() => {
        const errors = validator(formData, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }, [formData, validateConfig]);

    useEffect(() => {
        validate();
    }, [formData, validate]);

    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>): void => {
            setIsLoading(true);
            setSuccessMessage(null);
            event.preventDefault();
            const isValid = validate();
            if (!isValid) {
                setIsLoading(false);
                return;
            }
            setTimeout(() => {
                localStorage.setItem("student", JSON.stringify(formData));
                setSuccessMessage("Data saved successfully!");
                window.scrollTo({ top: 0, behavior: "smooth" });

                setTimeout(() => {
                    setIsLoading(false);
                    router.push("/");
                }, 2000);
            }, 1000);
        },
        [formData, router, validate]
    );

    const isValid = _.isEmpty(errors);

    return (
        <div className="container mx-auto mt-5">
            <div className="flex justify-center">
                <div className="w-full max-w-md shadow-lg p-6">
                    <h3 className="mb-4 text-xl font-semibold">Student Form</h3>
                    {isLoading && <p>Loading...</p>}
                    {successMessage && (
                        <p className="text-green-500">{successMessage}</p>
                    )}
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
                            error={errors.avatar}
                        />
                        <TextField
                            name="name"
                            label="Student name"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            name="surname"
                            label="Student surname"
                            value={formData.surname}
                            onChange={handleChange}
                            error={errors.surname}
                        />
                        <TextField
                            name="year"
                            label="Student year"
                            value={formData.year}
                            onChange={handleChange}
                            error={errors.year}
                        />
                        <TextField
                            name="portfolio"
                            label="Student portfolio"
                            value={formData.portfolio}
                            onChange={handleChange}
                            error={errors.portfolio}
                        />
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                            disabled={!isValid || isLoading}
                        >
                            {isLoading ? "Saved..." : "Save"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentForm;
