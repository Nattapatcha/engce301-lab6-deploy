export async function searchMovie(search_data) {

    try {

        console.log('search_data: ' + search_data);

        const response = await fetch('https://192.168.150.153:3001/api/movie/search?search_text=' + search_data);

        return await response.json(); //***

        // console.log('Search Movie response: ' + await response);

    } catch (error) {
        return [];
    }

}

export async function getAllMovies() {

    try {
        //const response = await fetch('/api/users');
        const response = await fetch('https://192.168.150.153:3001/api/movie/all');
        //const response = await fetch('/api/movie/all');
        return await response.json();
    } catch (error) {
        return [];
    }

}

export async function createMovie(data) {
    console.log("vreate test", data)
    const response = await fetch('https://192.168.150.153:3001/api/movie/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: data.title,
            genre: data.genre,
            director: data.director,
            release_year: data.release_year
        })
    })
    return await response.json();
}

export async function deleteMovie(delete_data) {

    try {

        console.log('delete_data: ' + delete_data);
        //http://localhost:3001/api/movie/delete?delete_text=${delete_data}

        const response = await fetch(`https://192.168.150.153:3001/api/movie/delete?delete_text=${delete_data}`, {
            method: 'POST'
        });

        return await response.json(); 

    } catch (error) {
        return [];
    }

}