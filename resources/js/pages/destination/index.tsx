import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import { DestinationTable } from './destination-table';
import { Destination, PaginationCollection } from '@/types/model';
import { Pagination } from '@/components/ui/pagination';

type PageProps = {

    destinations: PaginationCollection<Destination>
    
}

const breadcrumbs: BreadcrumbItem[] = [
];

const Page: FC<PageProps>  = ({destinations})  => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion de destination" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <HeadingSmall title="Gestion des destinations" />
                <DestinationTable destinations={destinations.data} />
                <Pagination  items={destinations} />
            </div>
        </AppLayout>
    );
}

export default Page