import React from 'react'

const DeleteMovie = ({ onChangeForm, deleteMovie }) => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                    <h2>Delete Movie</h2>
                    <form>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <input type="text" onChange={(e) => onChangeForm(e)}
                                    className="form-control" name="delete_text" id="delete_text" placeholder="Movie name"
                                />

                            </div>
                        </div>
                        <button type="button" onClick={(e) => deleteMovie()}

                            className="btn btn-danger">Delete</button>

                    </form>
                </div>
            </div>

        </div>
    )
}
export default DeleteMovie