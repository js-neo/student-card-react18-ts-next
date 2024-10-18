import React from "react";
import IconCache from "@/components/IconCache";

interface TextFieldProps {
    name: string;
    type?: string;
    label: string;
    value: string;
    min?: number;
    max?: number;
    error?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeAvatar?: () => void;
}

const TextField: React.FC<TextFieldProps> = ({
    name,
    type = "text",
    label,
    value,
    min,
    max,
    error,
    onChange,
    onChangeAvatar
}) => {
    const getInputClasses = (): string =>
        `border rounded-l-md p-2 w-full ${
            error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-md`;

    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <div className="flex items-center">
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    min={min}
                    max={max}
                    placeholder={`enter ${label.toLowerCase()}`}
                    onChange={onChange}
                    className={getInputClasses()}
                />
                {onChangeAvatar && (
                    <button
                        className="bg-gray-200 border border-gray-300 text-gray-700 hover:bg-gray-300 rounded-r-md p-3 flex items-center"
                        type="button"
                        onClick={onChangeAvatar}
                    >
                        <IconCache />
                    </button>
                )}
            </div>
            {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
        </div>
    );
};

export default TextField;
