import HeadingSmall from '@/components/heading-small';
import { Pagination } from '@/components/ui/pagination';
import { DashboardCountMoneyCard } from '@/features/dashboard/dashboard-count-money-card';
import { DashboardDateFilter } from '@/features/dashboard/dashboard-date-filter';
import { TripStatTable } from '@/features/trip/trip-stat-table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { DashboardMonth, PaginationCollection, Trip } from '@/types/model';
import { Head } from '@inertiajs/react';
import { FC } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: dashboard().url,
    },
    {
        title: 'Trajet',
        href: '',
    },
];

const title = 'Trajet';

type Props = {
    months: DashboardMonth[];
    years: Array<string>;
    defaultYear: string;
    defaultMonth: string;
    trips: PaginationCollection<Trip>;
    defaultItinerary?: string;
    sumRevenueAndTotalCost: { netProfit: number; totalCost: number };
};

const Page: FC<Props> = ({
    months,
    years,
    defaultYear,
    defaultMonth,
    trips,
    defaultItinerary,
    sumRevenueAndTotalCost
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
                            <DashboardCountMoneyCard
                                netProfit={sumRevenueAndTotalCost.netProfit}
                                totalCost={sumRevenueAndTotalCost.totalCost}
                                emptyMessage="aucun trajet trouvé"
                                title="Trajet"
                            />

                            <TripStatTable
                                defaultItinerary={defaultItinerary ?? ''}
                                trips={trips.data}
                            />

                            <Pagination items={trips} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Page;
