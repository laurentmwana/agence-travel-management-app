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
                    {/* HEADER */}
                    <h2 className="mb-3 text-lg font-semibold">
                        {itinerary.start.name} → {itinerary.end.name}
                    </h2>

                    {/* TYPE */}
                    <div className="mb-2 flex items-center gap-1 text-sm">
                        <p className="font-medium">Type :</p>
                        <span className="flex items-center gap-1 capitalize">
                            <Icon size={13} />
                            {itinerary.type}
                        </span>
                    </div>

                    {/* DISTANCE */}
                    <p className="mb-2 text-sm">
                        Distance :
                        <span className="font-medium">
                            {itinerary.distance_km} km
                        </span>
                    </p>

                    {/* PRICING */}
                    <p className="mb-2 text-sm">
                        Prix par personne :
                        <span className="font-medium">
                            ${itinerary.price_per_person}
                        </span>
                    </p>

                    <p className="mb-2 text-sm">
                        Prix par siège :
                        <span className="font-medium">
                            ${itinerary.price_per_seat}
                        </span>
                    </p>

                    {/* SEATS */}
                    <p className="mb-2 text-sm">
                        Sièges disponibles :
                        <span className="font-medium">
                            {itinerary.available_seats}
                        </span>
                    </p>

                    {/* CREATED */}
                    <p className="mt-3 text-xs text-muted-foreground">
                        Créé il y a {ago(itinerary.created_at)}
                    </p>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
};
