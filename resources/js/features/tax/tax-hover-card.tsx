import { Button } from '@/components/ui/button';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import { ago } from '@/lib/date';
import { formatLargeNumber } from '@/lib/number';
import { excerpt } from '@/lib/string';
import { Tax } from '@/types/model';
import React from 'react';

interface Props {
    tax: Tax;
}

export const TaxHoverCard: React.FC<Props> = ({ tax }) => {
    return (
        <div>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button className="ps-0" variant="link">
                        {excerpt(tax.name, 50)}
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    <h2 className="mb-2 text-base font-semibold">{tax.name}</h2>
                    <p className="mb-2 text-sm font-semibold">
                        {formatLargeNumber(tax.amount)}$
                    </p>
                    <p className="mb-2 text-sm">{tax.description}</p>
                    <p className="mb-2 text-xs">
                        Créée il y a {ago(tax.created_at)}
                    </p>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
};
