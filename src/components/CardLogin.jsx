import React from 'react';
import CardShadow from './CardShadow';
import CardTitle from '../core/Card/CardTitle';
import CardBody from '../core/Card/CardBody';
import CardFooter from '../core/Card/CardFooter';
import CardHeader from '../core/Card/CardHeader';
import Logo from '../assets/IR2.jpg';
import { useState, useEffect } from 'react';
export default function CardLogin({ handleSubmit, customClass, errorMessage = '' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (email && password) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);
  return (
    <>
      <div className={`flex  h-full items-center  ${customClass} `} style={{ height: '80%' }}>
        <CardShadow
          customClass={`lg:w-1/4 w-10/12  p-4 lg:mr-14  shadow-md bg-white bg-opacity-60 mb-8`}
          height="90%">
          <div className=" flex justify-center  items-center">
            <CardHeader link={Logo} />
          </div>
          <CardTitle
            title1="welcome to"
            title2="Ideal roofing Company Limited Manufactures"
            title3="Web Portal"
          />
          <CardBody>
            <p className="text-center">Enter your credential to sign in </p>

            <form onSubmit={handleSubmit}>
              <div className=" pt-2 px-4">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@domain.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                />
                {errorMessage ? (
                  <span className=" top-0 right-4 mt-3 text-sm text-red-500 lg:mr-10 mr-4">
                    Invalid email address.{' '}
                  </span>
                ) : null}
              </div>
              <div className="pt-4 px-4 ">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                />
                {errorMessage ? (
                  <span className=" top-0 right-4 mt-3 text-sm text-red-500 lg:mr-10 mr-4">
                    Incorrect password{' '}
                  </span>
                ) : null}
              </div>
              <div className="pt-6 px-4">
                <button
                  type="submit"
                  disabled={isButtonDisabled}
                  className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                    isButtonDisabled
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-800 text-white hover:bg-green-700 focus:bg-green-700'
                  }`}>
                  logIn
                </button>
              </div>

              <div className="flex items-center pt-2 px-8">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <div className="ms-2 text-sm font-medium text-gray-900">
                  <p> remember me </p>
                </div>{' '}
              </div>
            </form>
          </CardBody>
          <CardFooter
            option1="forget password ?"
            option2="registre now ?"
            link1="login"
            link2="register"
          />
        </CardShadow>
      </div>
    </>
  );
}
