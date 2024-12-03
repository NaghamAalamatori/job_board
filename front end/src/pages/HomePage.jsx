import React from "react";
import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import JobListings from "../components/JobListings";
import ViewAllJobs from "../components/ViewAllJobs";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <>
      <Hero />
      <HomeCards />
      <JobListings isHome={true} limit={6} />
      <ViewAllJobs />
    </>
  );
};

export default HomePage;
