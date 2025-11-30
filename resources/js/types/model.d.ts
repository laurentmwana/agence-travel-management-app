interface Timestemp {
    created_at: string;
    updated_at: string;
}

export interface Destination extends Timestemp {
    id: string;
    name: string;
}

export type ItineraryType = 'plane' | 'boat' | 'train' | 'bus' | 'car';

export interface Itinerary extends Timestemp {
    id: string;
    is_scheduled: string;
    distance_km: number;
    type: ItineraryType;
    start: Destination;
    end: Destination;
}

export interface Trip extends Timestemp {
    id: string;
    perfomed_at: string;
    observation: string | null;
    total_cost: number;
    revenue: number;
    net_profit: number;
    fuel_cost: number;
    fuel_quantity: number;
    other_expenses: number;
    itinerary: Itinerary;
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

export interface DashboardGraphicItem {
    date: string;
    total_cost: number;
    net_profit: number;
}

export interface DashboardMonth {
    label: string;
    value: string;
}
