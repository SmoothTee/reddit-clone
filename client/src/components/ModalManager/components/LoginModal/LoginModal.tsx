import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

import styles from "./LoginModal.module.css";
import { RootModal } from "../RootModal";
import { Input } from "../../../Input";
import { Button } from "../../../Button";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../../redux/auth/actions";
import { useTypedSelector } from "../../../../redux/hooks";

interface IFormInputs {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const LoginModal = () => {
  const dispatch = useDispatch();

  const isFetching = useTypedSelector((state) => state.auth.isFetching);
  const error = useTypedSelector((state) => state.error);

  const { register, handleSubmit, errors, setError, formState } = useForm<
    IFormInputs
  >({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = (data: IFormInputs) => {
    dispatch(loginAction<IFormInputs>(data));
  };

  useEffect(() => {
    if (error && error.data) {
      Object.entries(error.data).forEach((err) =>
        setError(err[0] as keyof IFormInputs, {
          type: "manual",
          message: err[1] as string,
        })
      );
    }
  }, [error, setError]);

  return (
    <RootModal>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
        <Button
          type="submit"
          disabled={!formState.isValid}
          loading={isFetching}
        >
          Log In
        </Button>
      </form>
    </RootModal>
  );
};
