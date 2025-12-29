import HeadingSmall from '@/components/heading-small';
import { ButtonLink } from '@/components/ui/button-link';
import AppLayout from '@/layouts/app-layout';
import reports from '@/routes/reports';
import { type BreadcrumbItem } from '@/types';
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
    defaultDate: string;
    isResultExist?: boolean;
    tag?: TagItem;
};

const Page: FC<Props> = ({ defaultDate, isResultExist = false, tag }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <HeadingSmall title={title} />

                <div className="grid gap-6 p-4 lg:grid-cols-4 lg:gap-8 lg:p-0">
                    {/* Sidebar - Formulaire de commande */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 lg:top-24">
                            <ReportFormOrder defaultDate={defaultDate} />
                        </div>
                    </div>

                    {/* Contenu principal */}
                    <div className="space-y-6 lg:col-span-3">
                        <div className="space-y-4">
                            <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl lg:p-8">
                                {/* Formulaire de rapport */}
                                <ReportForm
                                    url={window.location.pathname}
                                    tag={tag}
                                />

                                {/* Résultats */}
                                {isResultExist && (
                                    <div className="space-y-4 border-t border-border/50 pt-4">
                                        <div className="py-4 text-center lg:text-left">
                                            <p className="text-lg font-semibold text-primary/80">
                                                ✅ Nous avons trouvé un résultat
                                            </p>
                                        </div>

                                        <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                                            <ButtonLink
                                                native={true}
                                                href={''}
                                                className="flex w-full items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/90 px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:from-primary/90 hover:to-primary hover:shadow-xl sm:w-auto"
                                            >
                                                <Download size={18} />
                                                <span>
                                                    Télécharger le rapport
                                                </span>
                                            </ButtonLink>
                                        </div>
                                    </div>
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
