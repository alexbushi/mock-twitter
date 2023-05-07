import { Heading } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <Heading>
      {isRouteErrorResponse(error) ? "Invalid page" : "Unexpected Error"}
    </Heading>
  );
};

export default ErrorPage;
