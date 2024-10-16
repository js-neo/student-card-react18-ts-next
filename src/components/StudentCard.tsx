"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import _ from "lodash";

// Определяем интерфейс для данных студента
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

    if (!studentData || _.isEmpty(studentData)) {
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

    return (
        <div className="container mx-auto my-3 min-h-screen flex items-center justify-center">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img className="w-full" src={avatar} alt="Card image" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{`${name} ${surname}`}</div>
                    <p className="text-gray-700 text-base">{year}</p>
                    <p className="text-gray-700 text-base">{portfolio}</p>
                    <div className="flex justify-between">
                        <a
                            href="#"
                            className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-3"
                        >
                            Кнопка
                        </a>
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
