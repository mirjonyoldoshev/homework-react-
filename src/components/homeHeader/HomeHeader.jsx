import React from "react";
import { NavLink } from "react-router-dom";

const HomeHeader = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <span className="text-xl font-bold">MyProducts</span>
        </div>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <NavLink to="/" className="hover:text-gray-300">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="hover:text-gray-300">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="hover:text-gray-300">
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="hover:text-gray-300">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/auth" className="hover:text-gray-300">
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
