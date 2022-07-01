import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <div>
      <header
        className="px-4 fixed w-full z-10 text-white"
        style={{
          backgroundColor: "rgba(255,255,255,.9)",
          boxShadow:
            "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
        }}
      >
        <div className="container flex justify-between h-16 py-1 mx-auto">
          <NavLink
            to="/home"
            rel="noopener noreferrer"
            className="flex items-center px-4 hover:bg-gradient-to-l hover:from-teal-400 hover:to-lime-400 hover:bg-clip-text hover:text-transparent font-extrabold text-transparent px-4 text-4xl  bg-clip-text bg-gradient-to-r from-teal-400 to-lime-400 "
          >
            Movie Start
          </NavLink>
          <ul className="items-stretch hidden space-x-3 lg:flex mb-0">
            <li className="flex">
              <NavLink
                to="/home"
                rel="noopener noreferrer"
                className="flex items-center px-4   text-header"
                activeClassName="border-b-2 border-lime-400	"
              >
                Home
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to="/contact"
                rel="noopener noreferrer"
                className="flex items-center px-4   dark:border-transparent  text-header"
                activeClassName="border-b-2 border-lime-400	"
              >
                Contact
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to="/news"
                rel="noopener noreferrer"
                className="flex items-center px-4  dark:border-transparent text-header"
                activeClassName="border-b-2 border-lime-400	"
              >
                News
              </NavLink>
            </li>
          </ul>
          <div className="items-center flex-shrink-0 hidden lg:flex">
            <button className="self-center p-2 font-semibold rounded text-center bg-gradient-to-r from-teal-300 to-lime-300 ease-in duration-300 hover:bg-gradient-to-l hover:from-teal-300 hover:to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-teal-700">
              <NavLink
                to="/login"
                rel="noopener noreferrer"
                className="flex items-center px-4   text-black  hover:text-black"
              >
                Sign in
              </NavLink>
            </button>
            <button className="self-center p-2 font-semibold rounded ml-2 text-center bg-gradient-to-l from-teal-300 to-lime-300 ease-in duration-300 hover:bg-gradient-to-r hover:from-teal-300 hover:to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-teal-700">
              <NavLink
                to="/"
                rel="noopener noreferrer"
                className="flex items-center px-4  text-black hover:text-black"
              >
                Sign up
              </NavLink>
            </button>
          </div>
          <button className="p-4 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}
