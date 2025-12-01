import HeadingSmall from '@/components/heading-small';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PaginationCollection, Trip } from '@/types/model';
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import { TripTable } from './trip-table';

type PageProps = {
    trips: PaginationCollection<Trip>;
};

const title = 'Gestion des trajets';

const breadcrumbs: BreadcrumbItem[] = [];

const Page: FC<PageProps> = ({ trips }) => {
    console.log(trips.data)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <HeadingSmall title={title} />
                <TripTable trips={trips.data} />
                <Pagination items={trips} />
            </div>
        </AppLayout>
    );
};

export default Page;
