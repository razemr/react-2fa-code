export interface AuthCodeProps {
    value?: string;
    length?: number;
    password?: boolean;
    disabled?: boolean;
    allowPaste?: boolean;
    pattern?: RegExp | string;
    autoFocus?: boolean;
    containerClassName?: string;
    inputClassName?: string;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
}
