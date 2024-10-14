"use client";

import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import TextField from "@/components/TextField";

interface IFormData {
    name: string;
    surname: string;
    year: string;
    portfolio: string;
    avatar?: string;
}

const StudentForm: React.FC = () => {
    const [formData, setFormData] = React.useState<IFormData>({
        name: "",
        surname: "",
        year: "",
        portfolio: ""
    });
    const router = useRouter();

    useEffect(() => {
        const studentDataString = localStorage.getItem("student");
        if (studentDataString) setFormData(JSON.parse(studentDataString));
    }, []);

    const handleChange = ({
        target: { name, value }
    }: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const generateAvatarUrl = (): string => {
        const seed = Math.random().toString(36).substring(2, 10); // Убираем "1."
        return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        const student = {...formData, avatar: formData.avatar || generateAvatarUrl()}
        localStorage.setItem("student", JSON.stringify(student));
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
