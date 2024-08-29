import { useContext } from "react";
import { AuthCodeContext } from "../context";

const useAuthCodeContext = () => {
  const context = useContext(AuthCodeContext);

  if (!context) {
    throw new Error(
      "useAuthCodeContext must be used within a AuthCodeContext Provider."
    );
  }

  return context;
};

export default useAuthCodeContext;
