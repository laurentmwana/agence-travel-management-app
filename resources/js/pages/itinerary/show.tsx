import HeadingSmall from '@/components/heading-small';
import { ItineraryDetails } from '@/features/itinerary/itinerary-details';
import AppLayout from '@/layouts/app-layout';
import itinerary from '@/routes/itinerary';
import { type BreadcrumbItem } from '@/types';
import { Itinerary } from '@/types/model';
import { Head } from '@inertiajs/react';
import { FC } from 'react';

type PageProps = {
    itinerary: { data: Itinerary };
};

const title = "Détails  d'une itinéraire";

const breadcrumbs: BreadcrumbItem[] = [
    { href: itinerary.index().url, title: 'Itinéraire' },
    { href: '', title: 'Détails' },
];

const Page: FC<PageProps> = ({ itinerary }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <HeadingSmall title={title} />
                <div className="w-full">
                    <ItineraryDetails itinerary={itinerary.data} />
                </div>
            </div>
        </AppLayout>
    );
};

export default Page;
