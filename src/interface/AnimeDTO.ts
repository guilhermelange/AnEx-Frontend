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
    created_at?: string;
    updated_at?: string;
    favorite: boolean;
    genres?: GenreDTO[] | null;
    authors?: AuthorDTO[] | null;
    seasons?: SeasonDTO[] | null;
    seasonsCount: number;
    evaluationMedia: number;
}