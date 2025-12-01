import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import { AcmiCard } from './acmi-card';

type PageProps = {
    priceAcmi: number;
};

const breadcrumbs: BreadcrumbItem[] = [];

const title = 'ACMI';

const Page: FC<PageProps> = ({ priceAcmi }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <HeadingSmall title={title} />
                <AcmiCard amount={priceAcmi} />
            </div>
        </AppLayout>
    );
};

export default Page;
