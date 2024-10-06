import React from 'react'


const SearchMovie = ({onChangeForm, searchMovie }) => {


    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                <h2>Search Movie</h2>
                <form>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="search_text" id="search_text" placeholder="Director" />
                        </div>

                    </div>
                    <button type="button" onClick= {(e) => searchMovie()} className="btn btn-danger">Search</button>
                </form>
                </div>
            </div>

        </div>
    )
}

export default SearchMovie

