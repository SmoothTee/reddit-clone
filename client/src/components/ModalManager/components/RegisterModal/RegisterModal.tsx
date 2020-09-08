import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

import styles from "./RegisterModal.module.css";
import { RootModal } from "../RootModal";
import { Input } from "../../../Input";
import { Button } from "../../../Button";

interface IFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const RegisterModal = () => {
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = (data: IFormInputs) => console.log(data);

  return (
    <RootModal>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          name="email"
          label="Email"
          error={formState.touched.email ? errors.email?.message : ""}
        />
        <Input
          ref={register}
          name="username"
          label="Username"
          error={formState.touched.username ? errors.username?.message : ""}
        />
        <Input
          ref={register}
          name="password"
          label="Password"
          type="password"
          error={formState.touched.password ? errors.password?.message : ""}
        />
        <Input
          ref={register}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          error={
            formState.touched.confirmPassword
              ? errors.confirmPassword?.message
              : ""
          }
        />
        <Button type="submit">Register</Button>
      </form>
    </RootModal>
  );
};
