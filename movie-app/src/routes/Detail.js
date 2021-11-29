import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Detail() {
    const [movieData, setMovieData] = useState([]);

    const {id} = useParams();

    const getMovieDetail = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();

        setMovieData(json.data.movie);
    }

    useEffect(() => {
        getMovieDetail();
    }, []);

    return (
        <h1>Detail</h1>
    );
}

export default Detail;