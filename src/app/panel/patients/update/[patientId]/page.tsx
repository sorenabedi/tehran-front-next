import PatientsCreateView from "@/views/patientsCreate/patient-create.view";
import React, { FunctionComponent } from "react";

const PatientsUpdatePage: FunctionComponent = ({}) => {
  return (
    <>
      <PatientsCreateView update />
    </>
  );
};
PatientsUpdatePage.displayName = "PatientsUpdatePage";

export default PatientsUpdatePage;
