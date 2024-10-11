import React from "react";

interface TextFieldProps {
    name: string;
    label: string;
    value: string;
    error?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({
    name,
    label,
    value,
    error,
    onChange
}) => {
    return (
        <div className="mb-4">
            <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <div className="relative">
                <input
                    type="text"
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`mt-1 block w-full border ${
                        error ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
                />
                {error && (
                    <div className="mt-2 text-sm text-red-600">{error}</div>
                )}
            </div>
        </div>
    );
};

export default TextField;
