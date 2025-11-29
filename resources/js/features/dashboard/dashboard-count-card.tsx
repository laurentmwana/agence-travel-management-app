import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import React from 'react';

interface DashboardCountCardProps {
    title: string;
    count: number;
    emptyMessage: string;
}

export const DashboardCountCard: React.FC<DashboardCountCardProps> = ({
    count,
    emptyMessage,
    title,
}) => {
    return (
        <div>
            <Card className="shadow-none">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {count <= 0 && (
                        <CardDescription>{emptyMessage}</CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    <h2 className="text-center text-5xl font-semibold">
                        {count}
                    </h2>
                </CardContent>
            </Card>
        </div>
    );
};
