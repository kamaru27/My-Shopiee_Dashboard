"use client";
import React from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { adminApi } from "@/api/authApi";

const mySchema = z.object({
  email: z.string().min(1, { message: "E-mail is required." }),
  oldPassword: z.string().min(1, { message: "Current Password is required." }),
  newPassword: z.string().min(1, { message: "New Password is required." }),
  confirmedPassword: z
    .string()
    .min(1, { message: "Confirm Password is required." }),
});

type TMySchema = z.infer<typeof mySchema>;

const PasswordUpdate = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TMySchema>({ resolver: zodResolver(mySchema) });

  // console.log('err::', errors)
  const submitData = async (data: any) => {
    // console.log('first:::::')
    try {
      // console.log('daaa:::::;', data)
      const response = await adminApi.PasswordUpdate(data);
      console.log(response);
      if (response.data.success==false) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        router.push("/");
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error("User not found");
    }
  };
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="w-[50%]">
          <form onSubmit={handleSubmit(submitData)}>
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="border-b border-stroke px-5 pt-4 dark:border-dark-3">
                <h3 className="text-center font-medium text-dark dark:text-white">
                  Password
                </h3>
                <div className="p-7 pt-0">
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2"></div>
                    </div>

                    <div className="mb-5.5">
                      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        Email
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.0008 1.0415C7.81464 1.0415 6.04243 2.81371 6.04243 4.99984C6.04243 7.18596 7.81464 8.95817 10.0008 8.95817C12.1869 8.95817 13.9591 7.18596 13.9591 4.99984C13.9591 2.81371 12.1869 1.0415 10.0008 1.0415ZM7.29243 4.99984C7.29243 3.50407 8.50499 2.2915 10.0008 2.2915C11.4965 2.2915 12.7091 3.50407 12.7091 4.99984C12.7091 6.49561 11.4965 7.70817 10.0008 7.70817C8.50499 7.70817 7.29243 6.49561 7.29243 4.99984Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.0008 10.2082C8.0728 10.2082 6.29653 10.6464 4.9803 11.3868C3.68367 12.1161 2.7091 13.2216 2.7091 14.5832L2.70904 14.6681C2.7081 15.6363 2.70692 16.8515 3.77277 17.7195C4.29733 18.1466 5.03116 18.4504 6.0226 18.6511C7.01681 18.8523 8.31262 18.9582 10.0008 18.9582C11.6889 18.9582 12.9847 18.8523 13.9789 18.6511C14.9704 18.4504 15.7042 18.1466 16.2288 17.7195C17.2946 16.8515 17.2934 15.6363 17.2925 14.6681L17.2924 14.5832C17.2924 13.2216 16.3179 12.1161 15.0212 11.3868C13.705 10.6464 11.9287 10.2082 10.0008 10.2082ZM3.9591 14.5832C3.9591 13.8737 4.47691 13.1041 5.59313 12.4763C6.68976 11.8594 8.24682 11.4582 10.0008 11.4582C11.7547 11.4582 13.3118 11.8594 14.4084 12.4763C15.5246 13.1041 16.0424 13.8737 16.0424 14.5832C16.0424 15.673 16.0088 16.2865 15.4394 16.7502C15.1307 17.0016 14.6145 17.2471 13.7309 17.4259C12.8501 17.6042 11.646 17.7082 10.0008 17.7082C8.35558 17.7082 7.15138 17.6042 6.27059 17.4259C5.38703 17.2471 4.87086 17.0016 4.56209 16.7502C3.99269 16.2865 3.9591 15.673 3.9591 14.5832Z"
                              fill=""
                            />
                          </svg>
                        </span>
                        <input
                          {...register("email")}
                          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          type="email"
                          placeholder="E-mail"
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mb-5.5">
                      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        Current Password
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                          <svg
                            className="fill-transparent"
                            width="20"
                            height="20"
                            viewBox="5 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke="#707070"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M17.26 11.44c2.618 0 4.74-2.113 4.74-4.72C22 4.113 19.878 2 17.26 2c-2.617 0-4.739 2.113-4.739 4.72 0 1.208.551 2.086.551 2.086l-5.731 5.708c-.257.256-.617.922 0 1.537l.661.658c.257.22.904.527 1.433 0l.771-.768c.772.768 1.654.329 1.984-.11.552-.768-.11-1.537-.11-1.537l.22-.22c1.059 1.054 1.985.44 2.315 0 .551-.768 0-1.536 0-1.536-.22-.44-.661-.44-.11-.988l.661-.659c.53.44 1.617.55 2.095.55Z"
                            />
                          </svg>
                        </span>
                        <input
                          {...register("oldPassword")}
                          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          type="Password"
                          placeholder="Current Password"
                        />
                        {errors.oldPassword && (
                          <p className="text-sm text-red-600">
                            {errors.oldPassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mb-5.5">
                      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        New Password
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                          <svg
                            className="fill-transparent"
                            width="20"
                            height="20"
                            viewBox="5 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke="#707070"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M17.26 11.44c2.618 0 4.74-2.113 4.74-4.72C22 4.113 19.878 2 17.26 2c-2.617 0-4.739 2.113-4.739 4.72 0 1.208.551 2.086.551 2.086l-5.731 5.708c-.257.256-.617.922 0 1.537l.661.658c.257.22.904.527 1.433 0l.771-.768c.772.768 1.654.329 1.984-.11.552-.768-.11-1.537-.11-1.537l.22-.22c1.059 1.054 1.985.44 2.315 0 .551-.768 0-1.536 0-1.536-.22-.44-.661-.44-.11-.988l.661-.659c.53.44 1.617.55 2.095.55Z"
                            />
                          </svg>
                        </span>
                        <input
                          {...register("newPassword")}
                          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          type="Password"
                          placeholder="New Password"
                        />{errors.newPassword && (
                          <p className="text-sm text-red-600">
                            {errors.newPassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mb-5.5">
                      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                          <svg
                            className="fill-transparent"
                            width="20"
                            height="20"
                            viewBox="5 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke="#707070"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M17.26 11.44c2.618 0 4.74-2.113 4.74-4.72C22 4.113 19.878 2 17.26 2c-2.617 0-4.739 2.113-4.739 4.72 0 1.208.551 2.086.551 2.086l-5.731 5.708c-.257.256-.617.922 0 1.537l.661.658c.257.22.904.527 1.433 0l.771-.768c.772.768 1.654.329 1.984-.11.552-.768-.11-1.537-.11-1.537l.22-.22c1.059 1.054 1.985.44 2.315 0 .551-.768 0-1.536 0-1.536-.22-.44-.661-.44-.11-.988l.661-.659c.53.44 1.617.55 2.095.55Z"
                            />
                          </svg>
                        </span>
                        <input
                          {...register("confirmedPassword")}
                          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          type="Password"
                          placeholder="Confirm Password"
                        />{errors.confirmedPassword && (
                          <p className="text-sm text-red-600">
                            {errors.confirmedPassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center gap-3">
                      <button
                        className="flex justify-center rounded-[7px] border border-stroke px-10 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        className="flex items-center justify-center rounded-[7px] bg-primary px-10 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                        type="submit"
                        // disabled={isSubmitting}
                      >
                        Save
                      </button>
                    </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordUpdate;
