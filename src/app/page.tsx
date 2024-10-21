import React from "react";
import StudentCard from "@/components/StudentCard/StudentCard";
import MotionWrapper from "@/components/MotionWrapper";

const HomePage: React.FC = () => {
    return (
        <MotionWrapper>
            <div className="container mx-auto p-4">
                <StudentCard />
            </div>
        </MotionWrapper>
    );
};

export default HomePage;
