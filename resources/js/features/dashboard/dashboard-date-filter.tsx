'use client';

import { useParams } from '@/hooks/use-params';
import type { MonthItem } from '@/types/model';
import { router } from '@inertiajs/react';
import type React from 'react';

interface DashboardDateFilterProps {
    years: Array<string>;
    defaultYear: string;
    months: MonthItem[];
    defaultMonth: string;
}

export const DashboardDateFilter: React.FC<DashboardDateFilterProps> = ({
    years,
    defaultYear,
    months,
    defaultMonth,
}) => {
    const { mergeParams } = useParams();

    const navigate = (params: Record<string, string>) => {
        router.get(mergeParams(window.location.pathname, params));
    };

    const getItemClasses = (isActive: boolean) =>
        `cursor-pointer rounded-md border p-2 text-sm transition-all hover:ms-2 ${isActive ? 'border-primary ' : 'hover:border-primary'}`;

    return (
        <div className="space-y-1">
            {years.map((y) => {
                const isYearActive = defaultYear === y.toString();

                return (
                    <div key={y}>
                        <div
                            onClick={() => navigate({ year: y })}
                            className={getItemClasses(isYearActive)}
                        >
                            {y}
                        </div>
                        {isYearActive && (
                            <div className="ms-3 mt-2 space-y-1">
                                {months.map((m) => {
                                    return (
                                        <div
                                            key={m.value}
                                            onClick={() =>
                                                navigate({
                                                    year: y,
                                                    month: m.value,
                                                })
                                            }
                                            className={getItemClasses(
                                                defaultMonth === m.value,
                                            )}
                                        >
                                            {m.label}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
