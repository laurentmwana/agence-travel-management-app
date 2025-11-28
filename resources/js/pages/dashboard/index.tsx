import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import dashboard from '@/routes/dashboard';
import { type BreadcrumbItem } from '@/types';
import { DashboardGraphicItem } from '@/types/model';
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import { DashboardCounterCard } from './dashboard-counter-card';
import { DashboardGraphicCard } from './dashboard-graphic-card';

const title = 'Tableau de bord';

const breadcrumbs: BreadcrumbItem[] = [];

type Props = {
    counters: {
        destination: number;
        itinerary: number;
        trip: number;
    };
    stats: DashboardGraphicItem[];
    defaultYear: string;
    years: Array<string>;
};

const Page: FC<Props> = ({ counters, stats, defaultYear, years }) => {
    console.log(years);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <HeadingSmall title={title} />
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <DashboardCounterCard
                        title="Destination"
                        moreRoute={dashboard.destination().url}
                        count={counters.destination}
                    />
                    <DashboardCounterCard
                        title="Itinéraire"
                        moreRoute={dashboard.itinerary().url}
                        count={counters.itinerary}
                    />
                    <DashboardCounterCard
                        title="Trajet"
                        moreRoute={dashboard.trip().url}
                        count={counters.trip}
                    />
                </div>
                <DashboardGraphicCard
                    chartData={stats}
                    defaultYear={defaultYear}
                    years={years}
                />
            </div>
        </AppLayout>
    );
};

export default Page;
