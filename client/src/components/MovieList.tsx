import {useState} from "react"
import {useQuery, useLazyQuery} from "@apollo/client";
import {QUERY_ALL_MOVIES, QUERY_GET_MOVIE} from "../graphQl/query";
import {type MovieType} from '../schema/typeData'

const MovieList = (): React.ReactNode => {

  const [movieSearched, setMovieSearched] = useState<string>("");
  const [searchedData, setSearchedData] = useState<string>('')

  const {data, loading, error} = useQuery(QUERY_ALL_MOVIES);
  const [
    fetchMovie,
    {data: movieSearchedData, error: movieError}
  ] = useLazyQuery(QUERY_GET_MOVIE)

  if(loading) return <h1>DATA IS LOADING...</h1>

  if(error) console.log(error)
  if(movieError) console.log(movieError)


  const pageContent = data && data.movies.map((movie: MovieType) => {
    return (
      <article key={movie.id} className="movie__list flex flex-col justify-between gap-2 text-sm bg-[rgba(255,255,255,.1)] p-2 rounded-sm backdrop-blur-sm">
        <div className="flex flex-col gap-1">
          <h2>Name: {movie.name}</h2>
          <h2>Year Publish: {movie.yearOfPublication}</h2>
          <h2>Theater: {movie.isInTheaters ? "Yes" : "No" }</h2>
        </div>
      </article>
    )
  })

  const content = (
    <section className="movie py-8">
      <h1 className="movie__title text-3xl text-center mb-4 underline underline-offset-8">Movie List</h1>
      <div className="grid gap-4 grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pageContent}
      </div>
      <div className="p-4" aria-hidden="true">
        <div className="flex justify-end">
          <input type="text" 
            placeholder="Name Movie..." 
            className="text-black min-w-0 max-w-[18rem] flex-auto me-2 py-1 px-2 rounded-sm"
            onChange={(e) => {
              setMovieSearched(e.target.value)
            }}
          />
          <button onClick={() => {
            setSearchedData(movieSearched)
            fetchMovie({
              variables: {
                name: movieSearched
              }
            })
          }}
          className="bg-[rgba(255,255,255,.4)] py-1 px-2 rounded-sm hover:opacity-75 transition duration-150"
          >Search</button>
        </div>
        <div className="mt-2">
          {movieSearchedData &&
          <article key={movieSearchedData.movie.id} className="movie__list flex flex-col justify-between gap-2 text-sm bg-[rgba(255,255,255,.1)] p-2 rounded-sm backdrop-blur-sm">
            <div className="flex flex-col gap-1">
              <h2>Name: {movieSearchedData.movie.name}</h2>
              <h2>Year Publish: {movieSearchedData.movie.yearOfPublication}</h2>
              <h2>Theater: {movieSearchedData.movie.isInTheaters ? "Yes" : "No" }</h2>
            </div>
          </article>}
          {movieError && <h2 className="bg-[rgba(230,255,68,0.3)] p-2 border border-yellow-400">Movie with name "{searchedData}" not found!</h2>}
        </div>
      </div>
    </section>
  )

  return content
}

export default MovieList