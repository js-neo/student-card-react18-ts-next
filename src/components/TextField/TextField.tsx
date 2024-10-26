import React from "react";
import IconCache from "@/components/IconCache";
import styles from "./TextField.module.css";

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
        `${styles["text-field__input"]} ${
            error
                ? styles["text-field__input--error"]
                : styles["text-field__input--default"]
        }`;

    return (
        <div className={styles["text-field"]}>
            <label htmlFor={name} className={styles["text-field__label"]}>
                {label}
            </label>
            <div className={styles["text-field__box"]}>
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
                        className={styles["text-field__button"]}
                        type="button"
                        onClick={onChangeAvatar}
                    >
                        <IconCache />
                    </button>
                )}
            </div>
            {error && (
                <div className={styles["text-field__error-message"]}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default TextField;
