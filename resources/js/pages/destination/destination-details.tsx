import { Button } from '@/components/ui/button';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import { ago } from '@/lib/date';
import { excerpt } from '@/lib/string';
import { Destination } from '@/types/model';
import React from 'react';

interface DestinationDetailsProps {
    destination: Destination;
}

export const DestinationDetails: React.FC<DestinationDetailsProps> = ({
    destination,
}) => {
    return (
        <div>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button variant="link">
                        {excerpt(destination.name, 20)}
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    <p className="mb-2 text-sm">{destination.name}</p>
                    <p className="mb-2 text-xs">
                        {ago(destination.created_at)}
                    </p>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
};
