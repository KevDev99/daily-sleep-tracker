import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";

import { useSelector } from "react-redux";

import Spinner from "../components/Spinner";

const DynamicHomePage = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Spinner />;
  }

  if(!user) {
    return <Navigate replace to="/landing" />
  }

  return <HomePage />;
};

export default DynamicHomePage;
