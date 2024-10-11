import React from "react";
import StudentCard from "@/components/StudentCard";
import Link from "next/link";

const HomePage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <StudentCard />
            <Link href="./edit" className="text-blue-500">
                Edit
            </Link>
        </div>
    );
};

export default HomePage;
