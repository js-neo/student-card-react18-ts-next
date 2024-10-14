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
                <input
                    type="text"
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={getInputClasses(error)}
                />
                {name === "avatar" && (
                    <button
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                        type="button"
                        onClick={onChangeAvatar}
                    >
                        <FontAwesomeIcon icon={faRedo} />
                    </button>
                )}

                {error && (
                    <div className="text-red-500 mt-2 text-sm">{error}</div>
                )}
            </div>
        </div>

        /* <div className="mb-4">
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
        </div> */
    );
};

export default TextField;
