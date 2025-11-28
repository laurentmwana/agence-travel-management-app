import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import itinerary from '@/routes/itinerary';
import { type BreadcrumbItem } from '@/types';
import { Itinerary } from '@/types/model';
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import { ItineraryForm } from './itinerary-form';

type PageProps = {
    itinerary: { data: Itinerary };
};

const title = "Edition d'une itinéraire";

const breadcrumbs: BreadcrumbItem[] = [
    { href: itinerary.index().url, title: 'Itinéraire' },
    { href: '', title: 'Edition' },
];

const Page: FC<PageProps> = ({ itinerary }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <HeadingSmall title={title} />
                <div className="w-full max-w-4xl">
                    <ItineraryForm entity={itinerary.data} />
                </div>
            </div>
        </AppLayout>
    );
};

export default Page;
