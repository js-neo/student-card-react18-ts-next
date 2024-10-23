"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./StudentCard.module.css";

export interface StudentData {
    name: string;
    surname: string;
    year: string;
    portfolio: string;
    avatar: string;
}

const StudentCard: React.FC = () => {
    const router = useRouter();
    const [studentData, setStudentData] = useState<StudentData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const studentDataString = localStorage.getItem("student");
                const data = studentDataString
                    ? JSON.parse(studentDataString)
                    : null;
                setStudentData(data);
            } catch (error) {
                console.error(`Error saving data: ${error}`);
            } finally {
                setIsLoading(false);
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleButton = () => {
        router.push("/edit");
    };

    if (isLoading) {
        return (
            <div className={styles["spinner-container"]}>
                <svg
                    className={styles.spinner}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
                    ></path>
                </svg>
                Loading...
            </div>
        );
    }

    if (!studentData) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <button onClick={handleButton} className={styles.button}>
                        Create Card
                    </button>
                </div>
            </div>
        );
    }

    const { name, surname, year, portfolio, avatar } = studentData;

    const calculateAge = (year: string): number =>
        new Date().getFullYear() - Number(year);

    const getAgeDeclension = (age: number): string => {
        const yearDeclensions = ["лет", "год", "года"];
        const lastDigit = age % 10;
        const lastTwoDigits = age % 100;
        let declension = yearDeclensions[0];

        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return declension;
        }

        switch (lastDigit) {
            case 1:
                declension = yearDeclensions[1];
                break;
            case 2:
            case 3:
            case 4:
                declension = yearDeclensions[2];
                break;
        }
        return declension;
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <Image
                    src={avatar}
                    alt="Avatar"
                    width={400}
                    height={400}
                    priority={true}
                    className={styles.avatar}
                />

                <div className="px-6 py-4">
                    <div className={styles.name}>{`${name} ${surname}`}</div>
                    <div className={styles["box-info"]}>
                        <p className={styles["row-info"]}>
                            <span className="font-bold">Year of birth:</span>
                            <span className="font-mono">{year}</span>
                        </p>
                        <p className={styles["row-info"]}>
                            <span className="font-bold">Age:</span>
                            <span className="font-mono">
                                {`${calculateAge(year)} ${getAgeDeclension(calculateAge(year))}`}
                            </span>
                        </p>
                        <p className={styles["row-info"]}>
                            <span className="font-bold">Portfolio:</span>
                            <span className="font-mono">{portfolio}</span>
                        </p>
                    </div>
                    <div className={styles.flexEnd}>
                        <button
                            className={styles.button}
                            onClick={handleButton}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentCard;
