import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trip } from '@/types/model';

import React from 'react';
import { getItineraryTypeIcon } from '../itinerary';

interface TripDetailsProps {
    trip: Trip;
}

export const TripDetails: React.FC<TripDetailsProps> = ({ trip }) => {
    const IconType = getItineraryTypeIcon(trip.itinerary.type);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-4">
                    <IconType size={15} />
                    <span>
                        {' '}
                        {trip.itinerary.start.name} -{' '}
                        {trip.itinerary.end.name}{' '}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <p className="mb-2 text-sm"></p>
                <p className="text-sm"></p>
            </CardContent>
        </Card>
    );
};
