"use client";
import Head from "next/head";

import { Layout } from "@scdr-app/commons";
import { useAuth } from "@clerk/nextjs";
import { Dashboard } from "@scdr-app/screening/components/dashboard";

export default function DashboardPage() {
  const { isLoaded, userId, getToken } = useAuth();
  console.log({ token: getToken() });
  if (!isLoaded || !userId) {
    return null;
  }
  return (
    <>
      <Head>
        <title>SCRH - Dashboard </title>
        <meta name="description" content="SCRH CANCER" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout xs='w-[600px] h-[600px]'>
        <Dashboard/>
      </Layout>
    </>
  );
}
