"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TextField from "@/components/TextField";

interface IFormData {
    name: string;
    surname: string;
    year: string;
    portfolio: string;
}

const StudentForm: React.FC = () => {
    const studentDataString = localStorage.getItem("student");

    const studentData = studentDataString
        ? JSON.parse(studentDataString)
        : {
              name: "",
              surname: "",
              year: "",
              portfolio: ""
          };

    const [formData, setFormData] = React.useState<IFormData>(studentData);

    const router = useRouter();

    const handleChange = ({
        target: { name, value }
    }: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        localStorage.setItem("student", JSON.stringify(formData));
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
                        <TextField
                            name="surname"
                            label="Student surname"
                            value={formData.surname}
                            onChange={handleChange}
                            error="test"
                        />
                        <TextField
                            name="year"
                            label="Student year"
                            value={formData.year}
                            onChange={handleChange}
                            error="test"
                        />
                        <TextField
                            name="portfolio"
                            label="Student portfolio"
                            value={formData.portfolio}
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
