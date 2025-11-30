import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types'; 
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import { LiterCard } from './liter-card';

type PageProps = {
    priceUnitLiter: number;
};

const breadcrumbs: BreadcrumbItem[] = [];

const title = '1 litre equivaut à ';

const Page: FC<PageProps> = ({ priceUnitLiter }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <HeadingSmall title={title} />
                <LiterCard amount={priceUnitLiter} />
            </div>
        </AppLayout>
    );
};

export default Page;
