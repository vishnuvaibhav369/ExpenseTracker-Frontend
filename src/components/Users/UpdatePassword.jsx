import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { changePasswordAPI } from "../../services/users/userService";
import { logoutAction } from "../../redux/slice/authSlice";
import AlertMessage from "../Alert/AlertMessage";
const validationSchema = Yup.object({
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Email is required"),
});

const UpdatePassword = () => {
  //Dispatch
  const dispatch = useDispatch();
  // Mutation
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: changePasswordAPI,
    mutationKey: ["change-password"],
  });
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    // Validations
    validationSchema,
    //Submit
    onSubmit: (values) => {
      mutateAsync(values.password)
        .then((data) => {
          //Logout
          dispatch(logoutAction());
          //remove the user from storage
          localStorage.removeItem("userInfo");
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Change Password
      </h3>

      {isPending && (
        <AlertMessage type="loading" message="Updating..." />
      )}

      {isError && (
        <AlertMessage
          type="error"
          message={error.response.data.message}
        />
      )}

      {isSuccess && (
        <AlertMessage
          type="success"
          message="Password updated successfully"
        />
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-4">
          <AiOutlineLock className="text-3xl text-gray-400" />

          <div className="flex-1">
            <label
              htmlFor="new-password"
              className="text-sm font-medium text-gray-700"
            >
              New Password
            </label>

            <input
              id="new-password"
              type="password"
              {...formik.getFieldProps("password")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new password"
            />
          </div>

          {formik.touched.password &&
            formik.errors.password && (
              <span className="text-xs text-red-500">
                {formik.errors.password}
              </span>
            )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
