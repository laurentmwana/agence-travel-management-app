import HeadingSmall from '@/components/heading-small';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PaginationCollection, Tax } from '@/types/model';
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import { TaxTable } from './tax-table';

type PageProps = {
    taxes: PaginationCollection<Tax>;
};

const breadcrumbs: BreadcrumbItem[] = [];

const title = 'Gestion de taxes';

const Page: FC<PageProps> = ({ taxes }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <HeadingSmall title={title} />
                <TaxTable taxes={taxes.data} />
                <Pagination items={taxes} />
            </div>
        </AppLayout>
    );
};

export default Page;
