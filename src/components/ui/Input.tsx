import React from "react";
import styled from "styled-components";
import {
  COLOR_PRIMARY_1,
  COLOR_ERROR,
  COLOR_SUCCESS,
  COLOR_WARNING,
  COLOR_GREY_DARK,
  COLOR_GREY_LIGHT,
} from "utils/colors";

export type status = "default" | "error" | "success" | "warning";
type types = "text" | "email" | "password" | "date" | "search";
// https://developer.mozilla.org/fr/docs/Web/HTML/Attributes/autocomplete
export interface InputProps {
  type?: types;
  autocomplete?: string;
  name?: string;
  value?: string;
  status?: status;
  disabled?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const handleStyle = (status?: status) => {
  switch (status) {
    case "default":
      return COLOR_PRIMARY_1;
    case "warning":
      return COLOR_WARNING;
    case "success":
      return COLOR_SUCCESS;
    case "error":
      return COLOR_ERROR;
  }
};

const StyledInput = styled.input<InputProps>`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 15px;
  border: none;
  border-bottom: 1px solid ${(props) => handleStyle(props.status)};
  border-radius: 5px;
  height: 48px;
  background-color: ${COLOR_GREY_DARK};
  color: ${COLOR_GREY_LIGHT};
  min-width: 320px;
  font-size: 16px;
  outline: 0;
  :disabled {
    opacity: 0.2;
  }
`;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      autocomplete,
      name,
      value,
      status = "default",
      disabled,
      placeholder,
      style,
      autoFocus = false,
      onChange,
      onBlur,
    },
    ref
  ) => (
    <StyledInput
      ref={ref}
      type={type}
      name={name}
      value={value}
      status={status}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
      autoComplete={autocomplete}
      onBlur={onBlur}
      style={{ width: "100%", ...style }}
      autoFocus={autoFocus}
    />
  )
);

Input.displayName = "Input";

export default Input;
