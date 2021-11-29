import PropTypes from "prop-types";
import { Link} from "react-router-dom";

function Movie({id, coverImg, title, summary, genres}) {

    return (
        <div>
            <img src={coverImg} alt={title}/>
            <br/>
                <Link to={`/movie/${id}`}>
                    <h2>{title}</h2>
                </Link>
            <p>{summary}</p>
            <ul>
                {genres.map(g => <li key={g}> {g}</li>)}
            </ul>
        </div>
    );
}

Movie.propTypes = {
    id: PropTypes.number,
    coverImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Movie;