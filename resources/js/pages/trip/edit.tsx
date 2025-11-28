import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import trip from '@/routes/trip';
import { type BreadcrumbItem } from '@/types';
import { Trip } from '@/types/model';
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import { TripForm } from './trip-form';

type PageProps = {
    trip: { data: Trip };
};

const title = "Edition d'un trajet";

const breadcrumbs: BreadcrumbItem[] = [
    { href: trip.index().url, title: 'Trajets' },
    { href: '', title: 'Edition' },
];

const Page: FC<PageProps> = ({ trip }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <HeadingSmall title={title} />
                <div className="w-full max-w-4xl">
                    <TripForm entity={trip.data} />
                </div>
            </div>
        </AppLayout>
    );
};

export default Page;
