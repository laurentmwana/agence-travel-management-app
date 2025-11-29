import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type React from 'react';

interface DashboardCountMoneyCardProps {
    title: string;
    netProfit: number;
    totalCost: number;
    emptyMessage: string;
}

export const DashboardCountMoneyCard: React.FC<
    DashboardCountMoneyCardProps
> = ({ netProfit, totalCost, emptyMessage, title }) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    const totalRevenue = netProfit + totalCost;
    const hasData = totalRevenue !== 0 || totalCost !== 0;

    const isProfit = netProfit > 0;
    const isLoss = netProfit < 0;
    const isCapital = netProfit === 0;

    const profitMargin =
        totalRevenue !== 0 ? (netProfit / totalRevenue) * 100 : 0;

    return (
        <Card className="shadow-none">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg">{title}</CardTitle>
                {!hasData && <CardDescription>{emptyMessage}</CardDescription>}
            </CardHeader>

            <CardContent>
                {hasData ? (
                    <div className="space-y-6">
                        {/* MAIN VALUE */}
                        <div className="space-y-2 text-center">
                            <p className="text-sm font-medium text-muted-foreground">
                                {isProfit
                                    ? 'Bénéfice net'
                                    : isLoss
                                      ? 'Perte nette'
                                      : 'Capital (aucune perte)'}
                            </p>

                            <h2
                                className={`text-4xl font-bold tabular-nums ${
                                    isProfit
                                        ? 'text-green-600 dark:text-green-500'
                                        : isLoss
                                          ? 'text-red-600 dark:text-red-500'
                                          : 'text-blue-600 dark:text-blue-400'
                                }`}
                            >
                                {formatCurrency(netProfit)}
                            </h2>

                            {/* BADGE */}
                            {netProfit !== 0 && (
                                <div className="flex items-center justify-center gap-2">
                                    <span
                                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium ${
                                            isProfit
                                                ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                                                : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                                        }`}
                                    >
                                        {/* Icon */}
                                        {isProfit ? (
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m18 15-6-6-6 6"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m6 9 6 6 6-6"
                                                />
                                            </svg>
                                        )}
                                        {Math.abs(profitMargin).toFixed(1)}%{' '}
                                        {isProfit ? 'de marge' : 'de perte'}
                                    </span>
                                </div>
                            )}

                            {isCapital && (
                                <p className="text-xs text-muted-foreground">
                                    Résultat neutre — aucun gain ou perte
                                </p>
                            )}
                        </div>

                        <div className="border-t border-border" />

                        {/* DETAILS */}
                        <div className="space-y-4">
                            {/* Revenus */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                                    <span className="text-sm text-muted-foreground">
                                        Revenu total
                                    </span>
                                </div>
                                <span className="text-base font-semibold tabular-nums">
                                    {formatCurrency(totalRevenue)}
                                </span>
                            </div>

                            {/* Coûts */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                                    <span className="text-sm text-muted-foreground">
                                        Coûts totaux
                                    </span>
                                </div>
                                <span className="text-base font-semibold tabular-nums">
                                    {formatCurrency(totalCost)}
                                </span>
                            </div>

                            {/* PROGRESS BAR */}
                            <div className="pt-2">
                                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                    <div
                                        className={`h-full transition-all ${
                                            isProfit
                                                ? 'bg-green-500'
                                                : isLoss
                                                  ? 'bg-red-500'
                                                  : 'bg-blue-500'
                                        }`}
                                        style={{
                                            width:
                                                totalRevenue > 0
                                                    ? `${Math.min(
                                                          Math.abs(
                                                              (netProfit /
                                                                  totalRevenue) *
                                                                  100,
                                                          ),
                                                          100,
                                                      )}%`
                                                    : '0%',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-12 text-center">
                        <p className="text-sm text-muted-foreground">
                            Aucune donnée financière disponible
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
