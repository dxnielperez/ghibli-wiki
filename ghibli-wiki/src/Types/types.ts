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
};

export type MenuModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
