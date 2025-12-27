import { Button } from '@/components/ui/button';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import { formatLargeNumber } from '@/lib/number';
import React from 'react';

interface Props {
    price: number;
    suffix?: string;
}

export const PriceHoverCard: React.FC<Props> = ({ price, suffix = '$' }) => {
    return (
        <div>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button className="ps-0" variant="link">
                        {formatLargeNumber(price)} {suffix}
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    <p className="mb-2 text-sm font-semibold">
                        {price} {suffix}
                    </p>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
};
