"use client";

import React from "react";
import { useRouter } from "next/navigation";

const StudentCard: React.FC = () => {
    const router = useRouter();
    const handleButton = () => {
        router.push("/edit");
    };

    const studentDataString = localStorage.getItem("student");

    const studentData = studentDataString ? JSON.parse(studentDataString) : {};
    const {
        name = "Not name",
        surname = "Not surname",
        year = "Not year",
        portfolio = "Not portfolio",
        avatar = "https://via.placeholder.com/400"
    } = studentData;

    return (
        <div className="container mx-auto my-3">
            <div className="flex justify-center">
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
        </div>
    );
};

export default StudentCard;
