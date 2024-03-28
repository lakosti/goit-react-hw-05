import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { requestMovieByQuery } from "../services/api";
import { Link } from "react-router-dom";

const MoviesPage = () => {
  const [searchQuery, SetSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (searchQuery === "") return;

    async function fetchDataByQuery() {
      try {
        setLoading(true);
        setError(false);

        const data = await requestMovieByQuery(searchQuery);
        console.log(data.results);
        setMovies(data.results);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchDataByQuery();
  }, [searchQuery]);

  const handleSearchFilm = (values, actions) => {
    setMovies([]);
    SetSearchQuery(values.query);
    actions.resetForm();
  };

  return (
    <>
      <Formik initialValues={{ query: "" }} onSubmit={handleSearchFilm}>
        <Form>
          <Field placeholder="Search film" type="text" name="query" />
          <button type="submit">Seacrh</button>
        </Form>
      </Formik>
      {loading && <p>Loading, please wait...</p>}
      {error && <p>Oops, something went wrong!</p>}
      <ul>
        {movies.map((item) => (
          <li key={item.id}>
            <Link to={`/movies/${item.id}`}>{item.original_title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MoviesPage;
