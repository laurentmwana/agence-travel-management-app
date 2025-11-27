import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import { ItineraryForm } from './itinerary-form';

type PageProps = {};

const title = 'Ajouter une itinéraire';

const breadcrumbs: BreadcrumbItem[] = [];

const Page: FC<PageProps> = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <HeadingSmall title={title} />
                <div className="w-full max-w-4xl">
                    <ItineraryForm />
                </div>
            </div>
        </AppLayout>
    );
};

export default Page;
