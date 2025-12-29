import HeadingSmall from '@/components/heading-small';
import { Pagination } from '@/components/ui/pagination';
import { DashboardCountCard } from '@/features/dashboard/dashboard-count-card';
import { DashboardDateFilter } from '@/features/dashboard/dashboard-date-filter';
import { DestinationStatTable } from '@/features/destination/destination-stat-table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Destination, MonthItem, PaginationCollection } from '@/types/model';
import { Head } from '@inertiajs/react';
import { FC } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: dashboard().url,
    },
    {
        title: 'Destination',
        href: '',
    },
];

const title = 'Destinations';

type Props = {
    months: MonthItem[];
    years: Array<string>;
    defaultYear: string;
    defaultMonth: string;
    destinations: PaginationCollection<Destination>;
};

const Page: FC<Props> = ({
    months,
    years,
    defaultYear,
    defaultMonth,
    destinations,
}) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <HeadingSmall title={title} />

                <div className="grid gap-4 lg:grid-cols-4">
                    <div className="lg:col-span-1">
                        <DashboardDateFilter
                            years={years}
                            defaultYear={defaultYear}
                            months={months}
                            defaultMonth={defaultMonth}
                        />
                    </div>

                    <div className="lg:col-span-3">
                        <div className="space-y-4">
                            <DashboardCountCard
                                count={destinations.meta.total}
                                emptyMessage="aucune destination trouvé"
                                title="Destination"
                            />

                            <DestinationStatTable
                                destinations={destinations.data}
                            />
                            <Pagination items={destinations} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Page;
