import { useContext } from "react";
import { VerificationCodeContext } from "../context";

const useVerificationCodeContext = () => {
  const context = useContext(VerificationCodeContext);

  if (!context) {
    throw new Error(
      "useVerificationCodeContext must be used within a VerificationCodeContext Provider."
    );
  }

  return context;
};

export default useVerificationCodeContext;
