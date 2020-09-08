import React, { forwardRef, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import styles from "./Input.module.css";

interface InputProps {
  name: string;
  label: string;
  type?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, type, label, error }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div
        className={`${styles.container} ${error ? styles.container_error : ""}`}
      >
        <input
          type={showPassword ? "text" : type}
          name={name}
          className={styles.input}
          ref={ref}
          placeholder=" "
          autoComplete="off"
        />
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
        {type === "password" ? (
          <button
            className={styles.toggle_password}
            onClick={(event) => {
              event.preventDefault();
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
          </button>
        ) : null}
        <span className={styles.error_message}>{error}</span>
      </div>
    );
  }
);
