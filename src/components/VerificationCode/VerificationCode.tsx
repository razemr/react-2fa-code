import React, { useEffect, useState, useMemo } from "react";
import classnames from "classnames";
import { type VerificationCodeProps } from "./types";
import Input from "../Input";
import { VerificationCodeContext } from "../../context";
import { isValidValue } from "./utils";

import "./styles.css";

const VerificationCode: React.FC<VerificationCodeProps> = ({
  value = "",
  length = 4,
  password = false,
  disabled = false,
  allowPaste = true,
  pattern = "",
  autoFocus = false,
  inputClassName,
  containerClassName,
  onChange,
  onComplete,
}) => {
  const [internalValue, setInternalValue] = useState<string>(value);
  const [hasBeenFocused, setHasBeenFocused] = useState<boolean>(false);

  useEffect(() => {
    if (isValidValue(value, pattern, length)) {
      setInternalValue(value);
    }
  }, [value, length, pattern]);

  useEffect(() => {
    if (internalValue.length === length) {
      onComplete?.(internalValue);
    }
  }, [internalValue, length, onComplete]);

  const updateValue = (newValue: string) => {
    if (isValidValue(newValue, pattern, length)) {
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleBackspace = () => {
    if (currentIndex > 0) {
      const updatedValue = [...internalValue];
      updatedValue[currentIndex - 1] = "";
      updateValue(updatedValue.join(""));
    }
  };

  const handleChange = (char: string) => {
    const updatedValue = [...internalValue];
    updatedValue[currentIndex] = char;
    updateValue(updatedValue.join(""));
  };

  const handlePaste = (text: string) => {
    if (allowPaste) {
      const trimmedText = text.slice(0, length - currentIndex);
      if (isValidValue(trimmedText, pattern, length - currentIndex)) {
        updateValue(internalValue + trimmedText);
      }
    }
  };

  const handleOnFocus = () => {
    setHasBeenFocused(true);
  };

  const currentIndex = useMemo(() => {
    for (let i = 0; i < length; i++) {
      if (internalValue[i] === "" || internalValue[i] === undefined) return i;
    }
    return length - 1;
  }, [internalValue, length]);

  return (
    <VerificationCodeContext.Provider
      value={{
        password,
        inputClassName,
      }}
    >
      <div className={classnames("rvc_container", containerClassName)}>
        {Array.from({ length }, (_, i) => (
          <Input
            key={i}
            selected={!disabled && currentIndex === i}
            canFocus={autoFocus || hasBeenFocused}
            value={internalValue[i] || ""}
            onBackspace={handleBackspace}
            onChange={handleChange}
            onPaste={handlePaste}
            onFocus={handleOnFocus}
          />
        ))}
      </div>
    </VerificationCodeContext.Provider>
  );
};

export default VerificationCode;
