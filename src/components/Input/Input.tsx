import React, { useEffect, useRef } from "react";
import classnames from "classnames";
import { useVerificationCodeContext } from "../../hooks";
import { type InputProps } from "./types";

import "./styles.css";

const Input: React.FC<InputProps> = ({
  selected,
  canFocus,
  value,
  onBackspace,
  onChange,
  onPaste,
  onFocus,
}) => {
  const { password, inputClassName } = useVerificationCodeContext();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selected && canFocus) {
      inputRef.current?.focus();
    }
  }, [selected, canFocus]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !value) {
      onBackspace();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text");
    onPaste(pastedData);
  };

  const handleFocus = () => {
    onFocus();
  };

  return (
    <input
      ref={inputRef}
      value={value}
      disabled={!selected}
      maxLength={1}
      type={password ? "password" : "text"}
      className={classnames("rvc__input", inputClassName)}
      aria-selected={selected}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onFocus={handleFocus}
    />
  );
};

export default Input;
