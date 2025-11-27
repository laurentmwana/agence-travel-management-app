import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Itinerary } from '@/types/model';
import React from 'react';
import { getItineraryTypeIcon } from '.';

interface ItineraryDetailsProps {
    itinerary: Itinerary;
}

export const ItineraryDetails: React.FC<ItineraryDetailsProps> = ({
    itinerary,
}) => {
    const IconType = getItineraryTypeIcon(itinerary.type);
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <IconType size={12} />
                    <span>Trajet</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <p className="mb-2 text-sm">
                    Distance: <strong>{itinerary.distance_km}km</strong>
                </p>
                <p className="text-sm">
                    Est promgrammé:{' '}
                    <strong>{itinerary.is_scheduled ? 'Oui' : 'Non'}</strong>
                </p>
            </CardContent>
        </Card>
    );
};
