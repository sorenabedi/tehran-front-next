import { FunctionComponent } from "react";
import ErrorView from "@/views/error";

const NotFoundPage: FunctionComponent = () => {
  return <ErrorView />;
};

NotFoundPage.displayName = "NotFoundPage";
export default NotFoundPage;
