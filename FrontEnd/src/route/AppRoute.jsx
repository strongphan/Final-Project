import { useRoutes } from "react-router-dom";
import React, { Suspense } from "react";
import { NotFound } from "../pages";
import { RequiredAuth } from "../components";
import { path } from "./routeContants";

const LoginLazy = React.lazy(() => import("../pages/Login"));
const ProfileLazy = React.lazy(() => import("../pages/Profile"));
const HomeLazy = React.lazy(() => import("../pages/home/Home"));
const DashboardLazy = React.lazy(() => import("../pages/dashboard/Dashboard"));

const BooksLazy = React.lazy(() => import("../pages/books/Books"));
const CreateBookLazy = React.lazy(() => import("../pages/books/CreateBook"));
const EditBookLazy = React.lazy(() => import("../pages/books/EditBook"));
const DetailBookLazy = React.lazy(() => import("../pages/books/DetailBook"));

const CategoryLazy = React.lazy(() => import("../pages/categories/Categories"));
const CreateCategoryLazy = React.lazy(() =>
  import("../pages/categories/CreateCategory")
);
const EditCategoryLazy = React.lazy(() =>
  import("../pages/categories/EditCategory")
);
const DetailCategoryLazy = React.lazy(() =>
  import("../pages/categories/DetailCategory")
);

const RequestLazy = React.lazy(() =>
  import("../pages/borrowRequests/Requests")
);
const UserRequestsLazy = React.lazy(() =>
  import("../pages/borrowRequests/UserRequests")
);

export const AppRoute = () => {
  const elements = useRoutes([
    {
      path: path.PUBLIC,
      element: (
        <Suspense>
          <HomeLazy />
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: path.HOME,
      element: (
        <Suspense>
          <HomeLazy />
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: path.DASHBOARD,
      element: (
        <Suspense>
          <DashboardLazy />
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: path.BOOKS,
      element: (
        <Suspense>
          <RequiredAuth>
            <BooksLazy />
          </RequiredAuth>
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: path.CREATEBOOK,
      element: (
        <Suspense>
          <RequiredAuth>
            <CreateBookLazy />
          </RequiredAuth>
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: path.EDITBOOK_ID,
      element: (
        <Suspense>
          <RequiredAuth>
            <EditBookLazy />
          </RequiredAuth>
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: path.DETAILBOOK_ID,
      element: (
        <Suspense>
          <DetailBookLazy />
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: path.CATEGORIES,
      element: (
        <Suspense>
          <RequiredAuth>
            <CategoryLazy />
          </RequiredAuth>
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: path.CREATECATEGORY,
      element: (
        <Suspense>
          <RequiredAuth>
            <CreateCategoryLazy />
          </RequiredAuth>
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: path.EDITCATEGORY_ID,
      element: (
        <Suspense>
          <RequiredAuth>
            <EditCategoryLazy />
          </RequiredAuth>
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: path.DetailCategoryLazy,
      element: (
        <Suspense>
          <DetailCategoryLazy />
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: path.LOGIN,
      element: (
        <Suspense>
          <LoginLazy />
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: path.PROFILE,
      element: (
        <RequiredAuth>
          <Suspense>
            <ProfileLazy />
          </Suspense>
        </RequiredAuth>
      ),
    },
    {
      path: path.REQUESTS,
      element: (
        <RequiredAuth>
          <Suspense>
            <RequestLazy />
          </Suspense>
        </RequiredAuth>
      ),
    },
    {
      path: path.USERREQUESTS,
      element: (
        <RequiredAuth>
          <Suspense>
            <UserRequestsLazy />
          </Suspense>
        </RequiredAuth>
      ),
    },
  ]);

  return elements;
};
