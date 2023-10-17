import React, { type FC } from "react";
import { useRouter } from "next/router";
import { api } from "@scdr-app/utils/api";
import { Layout } from "@scdr-app/commons";

const Slug: FC = () => {
  const router = useRouter();
  const { isLoading, isFetching, data, error } =
    api.patient.getPatientByEmail.useQuery({
      id: router.query.slug as string,
    });
  if (error?.data) {
    return (
      <Layout>
        <p className="text-white">
          Error : {JSON.stringify(error.data, null, 2)}
        </p>
      </Layout>
    );
  }
  if (isLoading) {
    return (
      <Layout>
        <p className="text-white">isLoading: {isLoading}</p>
      </Layout>
    );
  }
  if (isFetching) {
    return (
      <Layout>
        <p className="text-white">isFetching: {isFetching}</p>
      </Layout>
    );
  }
  return (
    <Layout>
      <p className="text-white">{JSON.stringify(data, null, 4)}</p>
    </Layout>
  );
};
export default Slug;
