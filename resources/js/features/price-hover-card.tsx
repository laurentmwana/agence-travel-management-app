import { Button } from '@/components/ui/button';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import { formatLargeNumber } from '@/lib/number';
import type React from 'react';

interface Props {
    price: number;
    suffix?: string;
    locale?: string;
    className?: string;
}

export const PriceHoverCard: React.FC<Props> = ({
    price,
    suffix = '$',
    locale = 'en-US',
    className,
}) => {
    const formattedShort = formatLargeNumber(price);
    const formattedFull = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button
                    className={`h-auto p-0 font-semibold ${className}`}
                    variant="link"
                    aria-label={`Price: ${formattedFull} ${suffix}`}
                >
                    {formattedShort} {suffix}
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto min-w-[200px]">
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                        Exact amount
                    </p>
                    <p className="text-xl font-bold tabular-nums">
                        {formattedFull} {suffix}
                    </p>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};
