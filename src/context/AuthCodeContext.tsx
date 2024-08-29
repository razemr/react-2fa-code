import { createContext } from "react";

const VerificationCodeContext = createContext<{
  password: boolean;
  inputClassName?: string;
} | null>(null);

export default VerificationCodeContext;
