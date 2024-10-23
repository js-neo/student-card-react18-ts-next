import React from "react";
import StudentForm from "@/components/StudentForm/StudentForm";
import MotionWrapper from "@/components/MotionWrapper";

const EditPage: React.FC = () => {
    return (
        <MotionWrapper>
            <div className="container mx-auto p-4">
                <StudentForm />
            </div>
        </MotionWrapper>
    );
};

export default EditPage;
