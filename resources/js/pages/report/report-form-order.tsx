import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';
import { useParams } from '@/hooks/use-params';
import { MonthItem } from '@/types/model';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';

interface ReportFormOrderProps {
    months: MonthItem[];
    years: string[];
    defaultYear?: string;
    defaultMonth?: string;
    defaultDate?: string;
}

export const ReportFormOrder: React.FC<ReportFormOrderProps> = ({
    months,
    years,
    defaultMonth,
    defaultYear,
    defaultDate,
}) => {
    const url = window.location.pathname;
    const { mergeParams } = useParams();

    const [isDate, setIsDate] = useState<boolean>(defaultDate !== null);

    const isMonthDisabled = defaultYear !== undefined && defaultYear.length > 0;
    return (
        <div className="flex flex-col gap-4">
            <DatePicker
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
                    checked={isDate}
                    onCheckedChange={(v) => setIsDate(v as boolean)}
                />
            </div>
        </div>
    );
};
