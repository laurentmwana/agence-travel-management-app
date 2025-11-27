import { Button } from '@/components/ui/button';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import { ago } from '@/lib/date';
import { Itinerary } from '@/types/model';
import React from 'react';

interface ItineraryHoverCardProps {
    itinerary: Itinerary;
}

export const ItineraryHoverCard: React.FC<ItineraryHoverCardProps> = ({
    itinerary,
}) => {
    return (
        <div>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button variant="link">
                        {/* {excerpt(destination.name, 20)} */}
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    <p className="mb-2 text-sm">{itinerary.distance_km}</p>
                    <p className="mb-2 text-xs">{ago(itinerary.created_at)}</p>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
};
