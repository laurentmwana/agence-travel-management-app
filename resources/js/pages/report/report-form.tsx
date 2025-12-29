import { ChipsSelector } from '@/components/ui/chips-select';
import { useParams } from '@/hooks/use-params';
import { router } from '@inertiajs/react';
import React from 'react';

export type TagItem = 'itinerary' | 'trip' | 'destination';

const items = [
    { id: 'itinerary', label: 'itinéraire' },
    { id: 'trip', label: 'trajet' },
    { id: 'destination', label: 'destination' },
];

interface ReportFormProps {
    tag?: TagItem;
    url: string;
}

export const ReportForm: React.FC<ReportFormProps> = ({ tag, url }) => {
    const { mergeParams } = useParams();

    return (
        <div>
            <ChipsSelector
                onSelectionChange={(v) =>
                    router.get(mergeParams(url, { tag: v as string }))
                }
                items={items.map((item) => {
                    return {
                        id: item.id,
                        value: item.id,
                        label: item.label,
                    };
                })}
                mode="single"
                searchable={false}
                selectedValues={tag}
            />
        </div>
    );
};
