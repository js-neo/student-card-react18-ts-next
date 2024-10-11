"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TextField from "@/components/TextField";

interface IFormData {
    name: string;
}

const StudentForm: React.FC = () => {
    const [formData, setFormData] = React.useState<IFormData>({ name: "" });

    const router = useRouter();

    const handleChange = ({
        target: { name, value }
    }: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        router.push("/");
    };

    return (
        <div className="container mx-auto mt-5">
            <div className="flex justify-center">
                <div className="w-full max-w-md shadow-lg p-6">
                    <h3 className="mb-4 text-xl font-semibold">Student Form</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="name"
                            label="Student name"
                            value={formData.name}
                            onChange={handleChange}
                            error="test"
                        />
                        <button className="text-blue-500">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentForm;
