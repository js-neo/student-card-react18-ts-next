import React from "react";
import IconCache from "./IconCache";

interface TextFieldProps {
    name: string;
    label: string;
    value: string;
    error?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeAvatar?: () => void;
}

const TextField: React.FC<TextFieldProps> = ({
    name,
    label,
    value,
    error,
    onChange,
    onChangeAvatar
}) => {
    const getInputClasses = () =>
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
                    type="text"
                    id={name}
                    name={name}
                    value={value}
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
