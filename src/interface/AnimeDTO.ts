import GenreDTO from "./GenreDTO";
import AuthorDTO from "./AuthorDTO";
import SeasonDTO from "./SeasonDTO";

export default interface AnimeDTO {
    id: string;
    name: string;
    description: string;
    cover_file: string;
    image_file: string;
    parental_rating: number;
    start_date: string;
    favorite: boolean;
    evaluation: boolean | null;
    genres?: GenreDTO[] | null;
    authors?: AuthorDTO[] | null;
    seasons?: SeasonDTO[] | null;
    seasonsCount: number;
    evaluationMedia: number;
    open?: boolean;
}