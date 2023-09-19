'use client'
import React, { ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';
import useForm from '../hooks/signinHook';
import { Modal } from 'antd';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';

function Form({ page }: { page: boolean }) {
  const {
    username,
    password,
    email,
    role,
    otpRefs,
    confirm_password,
    loading,
    handleClick,
    signInnWithgoogle,
    signinwithLogin,
    handleLogin,
    isModalOpen,
    otp,
    setotp,
    handleCancel,
    handleOk,
    handleforgetPssword,
  } = useForm({ page });

  const userId: string = useAppSelector((state) => state.authReducer.value.userId);
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      router.push('/');
    }
  }, []);

  return (
    <div className="md:flex md:my-20 md:mx-16 lg:mx-32">
      <div className="grid place-content-center md:hidden my-5">
        <Image src={'/loginn.jpg'} width={300} height={300} alt="Signin Profile" />
      </div>
      <div className="grid place-content-center w-screen md:justify-start md:ml-5 lg:grid lg:place-content-center">
        <form onSubmit={ page ? handleClick : handleLogin}>
        {page && (
          <div className="mb-4 md:mb-1 w-full">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username*
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="mt-1 block w-full p-3 md:p-2 lg:p-3 border-2 border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ref={username}
              required
            />
          </div>
        )}

        <div className="mb-4 md:mb-1">
          <label htmlFor="email" className="block text-medium font-medium text-gray-700">
            Email*
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="mt-1 block w-full p-3 border-2 md:p-2 lg:p-3 border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ref={email}
            required
          />
        </div>
        {page && (
          <div className="mb-4 md:mb-1">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              className="mt-1 pr-5 block w-full p-3 border-2 border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ref={role}
            >
              <option value="recruiter">JobSeeker</option>
              <option value="employer">Employee</option>
            </select>
          </div>
        )}

        <div className="mb-4 md:mb-1">
          <label htmlFor="password" className="block text-sm font-medium mt-2 text-gray-700">
            Password*
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="mt-1 block w-full p-3 md:p-2 lg:p-3 border-2 border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ref={password}
            required
          />
          {!page && (
            <button
              className="mt-2 text-blue-400 text-sm cursor-pointer"
              onClick={  handleforgetPssword }
            >
              Forget password?
            </button>
          )}
        </div>
        {page && (
          <div className="mb-4">
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
              Confirm Password*
            </label>
            <input
              id="confirm_password"
              type="password"
              placeholder="Confirm your password"
              className="mt-1 block w-full p-3 border-2 md:p-2 lg:p-3 border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ref={confirm_password}
              required
            />
          </div>
        )}
        <button
          type="button"
          className="login-with-google-btn my-3 w-full"
          onClick={page ? signInnWithgoogle : signinwithLogin}
        >
          Sign in with Google
        </button>
        {page ? (
          <button
            type="submit"
            className="w-full px-4 py-2 text-base md:p-2 lg:p-3   font-semibold text-white bg-indigo-950 rounded-md hover:bg-indigo-700"
          >
            {loading ? <CircularProgress /> : 'Submit'}
          </button>
        ) : (
          <button
            type="submit"
            className="w-full px-4 py-2 text-base md:p-2 lg:p-3  mt-3  font-semibold text-white bg-indigo-950 rounded-md hover:bg-indigo-700"
          >
            {loading ? <CircularProgress /> : 'Login'}
          </button>
        )}
         </form>
        {page ? (
          <>
            <p className="mt-3 md:text-sm">
              Do you have an account?
              <a href="/login" className="text-blue-500 md:text-center">
                {' '}
                Login
              </a>
            </p>
          </>
        ) : (
          <>
            <p className="mt-3 md:text-sm">
              Don't have an account?
              <a href="/signin" className="text-blue-500 md:text-center">
                {' '}
                Create
              </a>
            </p>
          </>
        )}
      </div>
      <div>
        <Image src={'/loginn.jpg'} width={1000} height={1000} alt="Signin Profile" className="hidden md:block" />
      </div>
      <Modal title="Otp verification" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="flex">
          <input
            className="border-2 rounded-xl text-center w-12 h-12 overflow-hidden mx-2"
            maxLength={1}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setotp({ ...otp, otp1: e.target.value });
              otpRefs[1].current?.focus();
            }}
            ref={otpRefs[0]}
          />
          <input
            className="border-2 rounded-xl text-center w-12 h-12 overflow-hidden mx-2"
            maxLength={1}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setotp({ ...otp, otp2: e.target.value });
              otpRefs[2].current?.focus();
            }}
            ref={otpRefs[1]}
          />
          <input
            className="border-2 rounded-xl text-center w-12 h-12 overflow-hidden mx-2"
            maxLength={1}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setotp({ ...otp, otp3: e.target.value });
              otpRefs[3].current?.focus();
            }}
            ref={otpRefs[2]}
          />
          <input
            className="border-2 rounded-xl text-center w-12 h-12 overflow-hidden mx-2"
            maxLength={1}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setotp({ ...otp, otp4: e.target.value });
              otpRefs[4].current?.focus();
            }}
            ref={otpRefs[3]}
          />
          <input
            className="border-2 rounded-xl text-center w-12 h-12 overflow-hidden mx-2"
            maxLength={1}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setotp({ ...otp, otp5: e.target.value });
              otpRefs[5].current?.focus();
            }}
            ref={otpRefs[4]}
          />
          <input
            className="border-2 rounded-xl text-center w-12 h-12 overflow-hidden mx-2"
            maxLength={1}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setotp({ ...otp, otp6: e.target.value });
              otpRefs[5].current?.blur();
            }}
            ref={otpRefs[5]}
          />
        </div>
      </Modal>
    </div>
  );
}

export default Form;
