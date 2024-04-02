import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../Loader/Loader";
import Layout from "../Layout/Layout";

const HomePage = lazy(() => import("../../pages/HomePage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
