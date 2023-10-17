import React, { type FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { api } from "@scdr-app/utils/api";
ChartJS.register(ArcElement, Tooltip, Legend);

const toDataPiePresenter = (
  reports?: Array<{
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    patientId: string;
    status: boolean;
  }>,
) => {
  if (!reports) return { falseValues: 0, trueValues: 0, totalValues: 0 };
  const trueValues = reports.filter((data) => data.status === true).length;
  const falseValues = reports.filter((data) => data.status === false).length;
  return { falseValues, trueValues, totalValues: reports.length };
};

const Dashboard: FC = () => {
  const { isLoading, isFetching, data, error } =
    api.patient.getAllPatient.useQuery();
  const reports = toDataPiePresenter(data?.reports);
  const dataSet = {
    labels: ["Positivo", "Negativo"],
    datasets: [
      {
        label: "# de Pacientes",
        data: [reports.trueValues, reports.falseValues],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 3,
      },
    ],
  };
  if (error?.data) {
    return (
      <p className="text-white">
        Error : {JSON.stringify(error.data, null, 2)}
      </p>
    );
  }
  if (isLoading) {
    return <p className="text-white">isLoading: {isLoading}</p>;
  }
  if (isFetching) {
    return <p className="text-white">isFetching: {isFetching}</p>;
  }
  return (
    <>
      <h1 className=" p-5 text-center text-4xl text-white">
        Numero total de despistajes <br></br> <span className="text-center">{reports.totalValues}</span>
      </h1>
      <Doughnut data={dataSet} />
    </>
  );
};

export default Dashboard;
