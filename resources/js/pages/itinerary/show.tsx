import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Itinerary } from '@/types/model';
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import { ItineraryForm } from './itinerary-form';
import { ItineraryDetails } from '@/features/itinerary/itinerary-details';

type PageProps = {
    itinerary: { data: Itinerary };
};

const title = "Détails  d'une itinéraire";

const breadcrumbs: BreadcrumbItem[] = [];

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
