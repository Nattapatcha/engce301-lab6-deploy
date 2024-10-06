import React from 'react'

export const Movies = ({movies}) => {

    console.log('movies length:::', movies.length)
    if (movies.length === 0) return null

    const MovieRow = (movie,index) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                  <td>{index + 1}</td>
                  <td>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.director}</td>
                  <td>{movie.release_year}</td>
              </tr>
          )
    }

    const movieTable = movies.map((movie,index) => MovieRow(movie,index))

    return(
        <div className="container">
            <h2>Movies</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Movie Id</th>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Director</th>
                    <th>Release</th>
                </tr>
                </thead>
                <tbody>
                    {movieTable}
                </tbody>
            </table>
        </div>
    )
}
