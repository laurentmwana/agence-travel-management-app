import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import { PassengerCard } from './passenger-card';

type PageProps = {
    priceUnitPassenger: number;
};

const breadcrumbs: BreadcrumbItem[] = [];

const title = '1 passanger paye ';

const Page: FC<PageProps> = ({ priceUnitPassenger }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <HeadingSmall title={title} />
                <PassengerCard amount={priceUnitPassenger} />
            </div>
        </AppLayout>
    );
};

export default Page;
