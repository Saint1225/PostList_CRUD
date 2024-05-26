import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen justify-center items-center text-center text-gray">
      <h1 className="text-5xl sm:text-7xl">Oops...</h1>
      <br />
      <h1 className="text-5xl sm:text-7xl">Page not found</h1>
      <br />
      <br />
      <button
        className="bg-yellow rounded-3xl py-1.5 px-5 text-2xl text-black"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default ErrorPage;
