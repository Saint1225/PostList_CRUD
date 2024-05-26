import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Rootlayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostListPage from "./pages/PostListPage";
import ViewPost from "./pages/ViewPost";
import UserProfileProvider from "./store/userReducer";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Rootlayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "post",
          element: <PostListPage />,
        },
        {
          path: "post/:postId",
          element: <ViewPost />,
        },
      ],
    },
  ]);

  const query = new QueryClient({});

  return (
    <QueryClientProvider client={query}>
      <ReactQueryDevtools />
      <UserProfileProvider>
        <RouterProvider router={router} />
      </UserProfileProvider>
    </QueryClientProvider>
  );
}

export default App;
