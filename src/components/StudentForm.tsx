"use client";

import React from "react";
import { useRouter } from "next/navigation";

const StudentForm: React.FC = () => {
    const router = useRouter();
    const handleButton = () => {
        router.push("/");
    };

    return (
        <div>
            <p>Student Form</p>
            <button className="text-blue-500" onClick={handleButton}>
                Save
            </button>
        </div>
    );
};

export default StudentForm;
