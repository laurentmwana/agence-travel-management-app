import { ButtonLink } from '@/components/ui/button-link';
import trip from '@/routes/trip';
import { Trip } from '@/types/model';
import { DownloadIcon } from 'lucide-react';
import React from 'react';

interface TripReportPdfProps {
    item: Trip;
}

export const TripReportPdf: React.FC<TripReportPdfProps> = ({ item }) => {
    return (
        <ButtonLink
            native={true}
            href={
                trip.reportPdf.item({
                    tripId: item.id,
                }).url
            }
            size="sm"
            variant="ghost"
        >
            <DownloadIcon size={15} />
        </ButtonLink>
    );
};
