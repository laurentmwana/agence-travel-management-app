import HeadingSmall from '@/components/heading-small';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Itinerary, PaginationCollection } from '@/types/model';
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import { ItineraryTable } from './itinerary-table';

type PageProps = {
    itineraries: PaginationCollection<Itinerary>;
};

const title = 'Gestion des itinéraires';

const breadcrumbs: BreadcrumbItem[] = [];

const Page: FC<PageProps> = ({ itineraries }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <HeadingSmall title={title} />
                <ItineraryTable itineraries={itineraries.data} />
                <Pagination items={itineraries} />
            </div>
        </AppLayout>
    );
};

export default Page;
