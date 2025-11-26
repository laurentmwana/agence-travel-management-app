interface Timestemp {
    created_at: string
    updated_at: string
}

export interface Destination extends Timestemp {
    id: string,
    name: string
}

export interface Trajet extends Timestemp {
    id: string,
    start: Destination,
    end: Destination
    capacity: number

  }

  export interface PaginationCollection<T> {
      data: T[];
      links: {
          first: string;
          last: string;
          prev: string | null;
          next: string | null;
      };
      meta: {
          current_page: number;
          from: null;
          last_page: number;
          links: {
              url: string | null;
              label: string;
              page: string | null;
              active: false;
          }[];
          path: string;
          per_page: number;
          to: string;
          total: number;
      };
  }