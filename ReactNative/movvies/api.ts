import { QueryFunction } from "react-query";

const API_KEY = "32aeb718cb3b0849894778b48d34fca0";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface TV {
  name: string;
  original_name: string;
  origin_country: string[];
  vote_count: number;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  popularity: number;
  media_type: string;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export interface TVResponse extends BaseResponse {
  results: TV[];
}

interface Fetchers<T> {
  [key: string]: QueryFunction<T>;
}

export const moviesApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),

  upcoming: () =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
    ).then((res) => res.json()),

  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
    ).then((res) => res.json()),

  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&page=1&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};

export const tvApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  airingToday: () =>
    fetch(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko-KR&page=1`
    ).then((res) => res.json()),
  topRated: () =>
    fetch(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`
    ).then((res) => res.json()),
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko-KR&page=1&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=ko-KR&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};
