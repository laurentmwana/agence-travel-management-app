import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
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
    const { mergeParams } = useParams();

    const [onlyMonth, setOnlyMonth] = useState<boolean>(false);

    return (
        <div className="flex flex-col gap-4">
            <DatePicker
                onlyMonth={onlyMonth}
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
                    onCheckedChange={(v) => setOnlyMonth(v as boolean)}
                />
            </div>
        </div>
    );
};
