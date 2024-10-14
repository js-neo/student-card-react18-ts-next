import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

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
    const getInputClasses = (error?: string) =>
        `border rounded-md p-2 w-full ${
            error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-500`;

    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <div className="relative">
                <div className="flex items-center">
                    <input
                        type="text"
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className={getInputClasses(error) + " pr-10"}
                    />
                    {name === "avatar" && (
                        <button
                            className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-10 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
                            type="button"
                            onClick={onChangeAvatar}
                        >
                            <FontAwesomeIcon icon={faRedo} />
                        </button>
                    )}
                </div>

                {error && (
                    <div className="text-red-500 mt-2 text-sm">{error}</div>
                )}
            </div>
        </div>
    );
};

export default TextField;
