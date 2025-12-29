import HeadingSmall from '@/components/heading-small';
import { ButtonLink } from '@/components/ui/button-link';
import AppLayout from '@/layouts/app-layout';
import reports from '@/routes/reports';
import { type BreadcrumbItem } from '@/types';
import { MonthItem } from '@/types/model';
import { Head } from '@inertiajs/react';
import { Download } from 'lucide-react';
import { FC } from 'react';
import { ReportForm, TagItem } from './report-form';
import { ReportFormOrder } from './report-form-order';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Repports',
        href: reports.index().url,
    },
];

const title = 'Rapports';

type Props = {
    months: MonthItem[];
    years: Array<string>;
    defaultYear: string;
    defaultMonth: string;
    defaultDate: string;
    isResultExist?: boolean;
    tag?: TagItem;
};

const Page: FC<Props> = ({
    months,
    years,
    defaultYear,
    defaultMonth,
    defaultDate,
    isResultExist = false,
    tag,
}) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <HeadingSmall title={title} />

                <div className="grid gap-4 lg:grid-cols-4">
                    <div className="lg:col-span-1">
                        <ReportFormOrder
                            years={years}
                            defaultDate={defaultDate}
                            defaultYear={defaultYear}
                            defaultMonth={defaultMonth}
                            months={months}
                        />
                    </div>

                    <div className="lg:col-span-3">
                        <div className="space-y-4">
                            <div className="flex w-full flex-col gap-4 rounded-md border p-5 hover:border-primary">
                                <ReportForm
                                    url={window.location.pathname}
                                    tag={tag}
                                />

                                {isResultExist && (
                                    <>
                                        <p className="">
                                            {' '}
                                            Nous avons trouvé un résultat
                                        </p>

                                        <ButtonLink native={true} href={''}>
                                            <Download size={15} />
                                            <span>Télécharger le rapport</span>
                                        </ButtonLink>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Page;
