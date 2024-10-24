"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@/components/TextField";
import Image from "next/image";
import { validator } from "@/utils/validator";
import _ from "lodash";
import styles from "./StudentForm.module.css";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const studentDataString = localStorage.getItem("student");
        if (studentDataString) {
            setFormData(JSON.parse(studentDataString));
        }
    }, []);

    const minYear = 1950;
    const maxYear = 2014;

    const validateConfig = useMemo(
        () => ({
            name: { isRequired: { message: "Field is required" } },
            surname: { isRequired: { message: "Field is required" } },
            year: {
                isRequired: { message: "Field is required" },
                isYearInRange: {
                    message: `Year must be between ${minYear} and ${maxYear}.`,
                    min: minYear,
                    max: maxYear
                }
            },
            portfolio: { isRequired: { message: "Field is required" } },
            avatar: {
                isNotPlaceholderAvatarUrl: {
                    message: "Click the avatar selection button"
                }
            }
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
            setErrorMessage(null);
            event.preventDefault();
            const isValid = validate();
            if (!isValid) {
                setIsLoading(false);
                return;
            }
            setTimeout(() => {
                try {
                    localStorage.setItem("student", JSON.stringify(formData));
                    setSuccessMessage("Data saved successfully!");
                } catch (error) {
                    console.error("Error saving data: ", error);
                    setErrorMessage("Failed to save data.");
                }

                setTimeout(() => {
                    setIsLoading(false);
                    router.push("/");
                }, 3000);
            }, 1000);
        },
        [formData, router, validate]
    );

    const isValid = _.isEmpty(errors);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    return (
        <div className={styles["student-form"]}>
            <div className={styles["student-form__flex-center"]}>
                <div className={styles["student-form__box"]}>
                    <h3 className={styles["student-form__title"]}>
                        Student Form
                    </h3>
                    {isLoading && <LoadingSpinner position="fixed" />}
                    {successMessage && (
                        <div
                            className={styles["student-form__success-message"]}
                        >
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className={styles["student-form__error-message"]}>
                            {errorMessage}
                        </div>
                    )}
                    <Image
                        src={formData.avatar}
                        alt="Avatar"
                        width={400}
                        height={400}
                        priority={true}
                        className={styles["student-form__avatar"]}
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
                            className={`${styles["student-form__button"]} ${isLoading ? styles["student-form__button--loading"] : ""}`}
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
