"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface StudentData {
    name: string;
    surname: string;
    year: string;
    portfolio: string;
    avatar: string;
}

const StudentCard: React.FC = () => {
    const router = useRouter();
    const [studentData, setStudentData] = useState<StudentData | null>(null);

    useEffect(() => {
        const studentDataString = localStorage.getItem("student");
        const data = studentDataString ? JSON.parse(studentDataString) : null;
        setStudentData(data);
    }, []);

    const handleButton = () => {
        router.push("/edit");
    };

    if (!studentData) {
        return (
            <div className="container mx-auto my-3 min-h-screen flex items-center justify-center">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <button
                        onClick={handleButton}
                        className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-3"
                    >
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
        <div className="container mx-auto my-3 min-h-screen flex items-center justify-center">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <Image
                    src={avatar}
                    alt="Avatar"
                    width={400}
                    height={400}
                    priority={true}
                    className="w-full h-auto"
                />

                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{`${name} ${surname}`}</div>
                    <div className="text-gray-700 text-base">
                        <p className="flex space-x-2">
                            <span className="font-bold">Year of birth:</span>
                            <span className="font-mono">{year}</span>
                        </p>
                        <p className="flex space-x-2">
                            <span className="font-bold">Age:</span>
                            <span className="font-mono">
                                {`${calculateAge(year)} ${getAgeDeclension(calculateAge(year))}`}
                            </span>
                        </p>
                        <p className="flex space-x-2">
                            <span className="font-bold">Portfolio:</span>
                            <span className="font-mono">{portfolio}</span>
                        </p>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-3"
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
