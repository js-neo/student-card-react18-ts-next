import React from "react";
import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
    position?: "absolute" | "fixed";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    position = "absolute"
}) => {
    return (
        <div className={`${position} ${styles["spinner-container"]}`}>
            <svg
                className={styles.spinner}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
                ></path>
            </svg>
            Loading...
        </div>
    );
};

export default LoadingSpinner;
