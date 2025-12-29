import { Checkbox } from '@/components/ui/checkbox';
import { DateOnlyPicker } from '@/components/ui/date-only-picker';
import { Label } from '@/components/ui/label';
import { useParams } from '@/hooks/use-params';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';

interface ReportFormOrderProps {
    defaultDate?: string;
}

export const ReportFormOrder: React.FC<ReportFormOrderProps> = ({
    defaultDate,
}) => {
    const url = window.location.pathname;
    const { mergeParams, params, setParams } = useParams<{
        onlyMonth?: string;
        onlyYear?: string;
    }>();

    const [onlyMonth, setOnlyMonth] = useState<boolean>(
        params.onlyMonth === '1' || params.onlyMonth === 'true',
    );
    const [onlyYear, setOnlyYear] = useState<boolean>(
        params.onlyYear === '1' || params.onlyYear === 'true',
    );

    return (
        <div className="flex flex-col gap-4">
            <DateOnlyPicker
                onlyMonth={onlyMonth}
                onlyYear={onlyYear}
                value={defaultDate}
                onChange={(value) => {
                    if (value) {
                        router.get(mergeParams(url, { date: value }));
                    }
                }}
            />

            <div>
                <Label htmlFor="only_month">Juste le mois </Label>
                <Checkbox
                    id="only_month"
                    checked={onlyMonth}
                    onCheckedChange={(v) => {
                        setOnlyMonth(v as boolean);
                        router.get(
                            mergeParams(url, {
                                ...params,
                                onlyMonth: v ? '1' : '0',
                            }),
                        );
                    }}
                />
            </div>

            <div>
                <Label htmlFor="only_year">Juste l'année </Label>
                <Checkbox
                    id="only_year"
                    checked={onlyYear}
                    onCheckedChange={(v) => {
                        setOnlyYear(v as boolean);
                        router.get(
                            mergeParams(url, {
                                ...params,
                                onlyYear: v ? '1' : '0',
                            }),
                        );
                    }}
                />
            </div>
        </div>
    );
};
