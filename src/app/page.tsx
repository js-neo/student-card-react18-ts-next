"use client";

import React, { useEffect, useState } from "react";
import StudentCard from "@/components/StudentCard/StudentCard";
import MotionWrapper from "@/components/MotionWrapper";
import { IStudentData } from "@/types";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const HomePage: React.FC = () => {
    const [studentData, setStudentData] = useState<IStudentData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadData = () => {
            const studentDataString = localStorage.getItem("student");
            const data = studentDataString
                ? JSON.parse(studentDataString)
                : null;
            setStudentData(data);
            setIsLoading(false);
        };

        const timer = setTimeout(loadData, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="relative h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <MotionWrapper>
            <div className="container mx-auto p-4">
                <StudentCard studentData={studentData} />
            </div>
        </MotionWrapper>
    );
};

export default HomePage;
