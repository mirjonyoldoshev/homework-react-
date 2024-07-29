import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Products from "./dashboard/products/Products";
import Users from "./dashboard/users/Users";
import Account from "./dashboard/account/Account";
import Cart from "./cart/Cart";
import ProductPage from "./product/Product";

const Home = lazy(() => import("./home/Home"));
const Auth = lazy(() => import("./auth/Auth"));

const Login = lazy(() => import("./auth/login/Login"));
const Register = lazy(() => import("./auth/register/Register"));

const RouteController = () => {
  return useRoutes([
    {
      path: "",
      element: (
        <Suspense
          fallback={
            <div className="flex min-h-screen w-full items-center justify-center bg-indigo-800 text-indigo-50">
              <span className="text-3xl">Loading...</span>
            </div>
          }
        >
          <Home />
        </Suspense>
      ),
    },
    {
      path: "auth",
      element: (
        <Suspense
          fallback={
            <div className="flex min-h-screen w-full items-center justify-center bg-indigo-800 text-indigo-50">
              <span className="text-3xl">Loading...</span>
            </div>
          }
        >
          <Auth />
        </Suspense>
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense
              fallback={
                <div className="flex min-h-screen w-full items-center justify-center bg-indigo-800 text-indigo-50">
                  <span className="text-3xl">Loading...</span>
                </div>
              }
            >
              <Login />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense
              fallback={
                <div className="flex min-h-screen w-full items-center justify-center bg-indigo-800 text-indigo-50">
                  <span className="text-3xl">Loading...</span>
                </div>
              }
            >
              <Register />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <Suspense
          fallback={
            <div className="flex min-h-screen w-full items-center justify-center bg-indigo-800 text-indigo-50">
              <span className="text-3xl">Loading...</span>
            </div>
          }
        >
          <Dashboard />
        </Suspense>
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense
              fallback={
                <div className="flex min-h-screen w-full items-center justify-center bg-indigo-800 text-indigo-50">
                  <span className="text-3xl">Loading...</span>
                </div>
              }
            >
              <Products />
            </Suspense>
          ),
        },
        {
          path: "users",
          element: (
            <Suspense
              fallback={
                <div className="flex min-h-screen w-full items-center justify-center bg-indigo-800 text-indigo-50">
                  <span className="text-3xl">Loading...</span>
                </div>
              }
            >
              <Users />
            </Suspense>
          ),
        },
        {
          path: "account",
          element: (
            <Suspense
              fallback={
                <div className="flex min-h-screen w-full items-center justify-center bg-indigo-800 text-indigo-50">
                  <span className="text-3xl">Loading...</span>
                </div>
              }
            >
              <Account />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "cart",
      element: (
        <Suspense
          fallback={
            <div className="flex min-h-screen w-full items-center justify-center bg-indigo-800 text-indigo-50">
              <span className="text-3xl">Loading...</span>
            </div>
          }
        >
          <Cart />
        </Suspense>
      ),
    },
    {
      path: "product/:productId",
      element: (
        <Suspense
          fallback={
            <div className="flex min-h-screen w-full items-center justify-center bg-indigo-800 text-indigo-50">
              <span className="text-3xl">Loading...</span>
            </div>
          }
        >
          <ProductPage />
        </Suspense>
      ),
    },
  ]);
};

export default RouteController;
