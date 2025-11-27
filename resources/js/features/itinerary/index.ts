import { ItineraryType } from '@/types/model';
import { Banknote, Bus, Car, Plane, Route, Train } from 'lucide-react';

export const getItineraryTypeIcon = (type: ItineraryType) => {
    switch (type) {
        case 'boat':
            return Banknote;
        case 'bus':
            return Bus;
        case 'car':
            return Car;
        case 'plane':
            return Plane;
        case 'train':
            return Train;
        default:
            return Route;
    }
};
