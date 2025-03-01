import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error: any = useRouteError();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-center">
      <h1 className="text-4xl font-bold text-red-800">Oops! Something went wrong.</h1>
      <p className="text-gray-600 mt-2">
        {error?.status} - {error?.statusText || "Unexpected error"}
      </p>
      <a href="/" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
        Go Back Home
      </a>
    </div>
  );
};

export default ErrorPage;
