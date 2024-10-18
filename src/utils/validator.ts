import { StudentData } from "@/components/StudentCard";

interface IValidationOptions {
    message: string;
    value?: number;
}

type ValidationConfig = {
    [key in keyof StudentData]?: {
        [key: string]: IValidationOptions;
    };
};

type ValidatorReturnType = string | undefined;

type IValidator = (
    data: string,
    options: IValidationOptions
) => ValidatorReturnType;

type ValidateMethod = {
    [key: string]: IValidator;
};

export function validator(data: StudentData, config: ValidationConfig) {
    const errors: Record<string, string> = {};
    const validate: ValidateMethod = {
        isRequired: (data, { message }) => {
            if (data.trim() === "") return message;
        },
        isNotPlaceholderAvatarUrl: (data: string, { message }) => {
            const placeholderUrl = "https://via.placeholder.com/400";
            if (data === placeholderUrl) return message;
        }
    };

    for (const [fieldName, content] of Object.entries(data)) {
        const validationOptions = config[fieldName as keyof StudentData];
        if (validationOptions) {
            for (const [validateMethod, options] of Object.entries(
                validationOptions
            )) {
                const errorMessage = validate[validateMethod]?.(
                    content,
                    options
                );
                if (errorMessage && !errors[fieldName]) {
                    errors[fieldName] = errorMessage;
                }
            }
        }
    }

    return errors;
}
