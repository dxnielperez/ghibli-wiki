export type FilmsProps = {
  description: string;
  id: string;
  image: string;
  original_title: string;
  release_date: string;
  title: string;
  director: string;
  producer: string;
  running_time: string;
  locations?: LocationProps[];
  people?: PeopleProps[];
  vehicles?: VehicleProps[];
  species?: SpeciesProps;
  movie_banner?: string;
};

export type MenuModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export interface LocationProps {
  id: string;
  name: string;
  climate: string;
  terrain: string;
  surface_water: string;
  films: string[];
  residents: string[];
  url: string;
}

export interface PeopleProps {
  id: string;
  name: string;
  age: string;
  gender: string;
  eye_color: string;
  hair_color: string;
  films: string[];
  species: string;
  speciesDetails: {
    id: string;
    name: string;
    classification: string;
    eye_colors: string;
    hair_colors: string;
    url: string;
  };
  url: string;
}

export interface SpeciesProps {
  id: string;
  name: string;
  classification: string;
  eye_colors: string;
  hair_colors: string;
  films: string[];
  people: string[];
}

export interface VehicleProps {
  id: string;
  name: string;
  description: string;
  length: string;
  vehicle_class: string;
  films: string[];
  pilot: string;
  url: string;
}
