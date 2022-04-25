import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import CreateJob from "../components/jobs/CreateJob";
import JobList from "../components/jobs/JobList";

const Home: NextPage = () => {
  let priorityList: string[] = [];

  if (typeof window !== "undefined") {
    priorityList = JSON.parse(localStorage.getItem("priorityList") || "[]");
  }

  useEffect(() => {
    if (priorityList.length === 0) {
      fetch("/api")
        .then((response) => response.json())
        .then((data) =>
          localStorage.setItem("priorityList", JSON.stringify(data))
        );
    }
  }, [priorityList.length]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ flexGrow: "1" }}>
        <CreateJob />
        <JobList />
      </main>
    </>
  );
};

export default Home;
