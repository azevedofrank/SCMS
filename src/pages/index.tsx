import Head from "next/head";

import { Layout } from "@scdr-app/commons";
import { Submit } from "@scdr-app/screening/";

export default function Home() {
  return (
    <>
      <Head>
        <title>SCHC - HOME</title>
        <meta name="description" content="SCHC - HOMEPAGE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="text-6xl mb-6 text-center text-white">Despistaje Retinoblastoma</h1>
        <Submit />
      </Layout>
    </>
  );
}
