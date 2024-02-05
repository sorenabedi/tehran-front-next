import PatientsCreateView from "@/views/patientsCreate/patient-create.view";
import React, { FunctionComponent } from "react";

const PatientsCreatePage: FunctionComponent = ({}) => {
  return (
    <>
      <PatientsCreateView />
    </>
  );
};
PatientsCreatePage.displayName = "PatientsCreatePage";

export default PatientsCreatePage;
