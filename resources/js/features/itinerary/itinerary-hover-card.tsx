import { Button } from '@/components/ui/button';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import { ago } from '@/lib/date';
import { excerpt } from '@/lib/string';
import { Itinerary } from '@/types/model';
import React from 'react';
import { getItineraryTypeIcon } from '.';

interface ItineraryHoverCardProps {
    itinerary: Itinerary;
}

export const ItineraryHoverCard: React.FC<ItineraryHoverCardProps> = ({
    itinerary,
}) => {
    const Icon = getItineraryTypeIcon(itinerary.type);
    return (
        <div>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button variant="link" className="ps-0">
                        {excerpt(
                            `${itinerary.start.name} - ${itinerary.end.name}`,
                            30,
                        )}
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    <h2 className="mb-3 text-xl font-semibold">
                        {itinerary.start.name} - ${itinerary.end.name}
                    </h2>
                    <p className="mb-2 text-sm">
                        Distance: {itinerary.distance_km}
                    </p>
                    <div className="lex mb-2 flex items-center gap-1 text-sm">
                        <p>Type : </p>
                        <p className="flex items-center gap-1">
                            <Icon size={13} /> <span> {itinerary.type} </span>
                        </p>
                    </div>
                    <p className="mb-2 text-xs">
                        Crééé il y a {ago(itinerary.created_at)}
                    </p>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
};
