import { ButtonLink } from '@/components/ui/button-link';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { LucideArrowRight } from 'lucide-react';
import React from 'react';
import { Label, Pie, PieChart } from 'recharts';

export const description = 'A donut chart with text';

interface Props {
    title: string;
    moreRoute: string;
    count: number;
}

export const DashboardCounterCard: React.FC<Props> = ({
    title,
    moreRoute,
    count,
}) => {
    const chartData = [
        {
            browser: 'targetKey',
            counter: count,
            fill: 'var(--color-targetKey)',
        },
    ];

    const totalCount = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.counter, 0);
    }, [count]);

    const chartConfig = {
        targetKey: {
            label: title,
            color: 'var(--chart-1)',
        },
    } satisfies ChartConfig;

    return (
        <div className="bg-card rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
            <div className="flex items-center justify-between gap-4">
                <h2>{title}</h2>
                <ButtonLink href={moreRoute} variant="outline" size="xs">
                    <LucideArrowRight size={14} />
                </ButtonLink>
            </div>
            {}
            <div className="mx-auto max-h-[200px] max-w-[200px]">
                {count <= 0 ? (
                    <p className="text-center text-sm text-foreground">
                        Pas de données
                    </p>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-square"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="counter"
                                nameKey="browser"
                                innerRadius={60}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (
                                            viewBox &&
                                            'cx' in viewBox &&
                                            'cy' in viewBox
                                        ) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {totalCount.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={
                                                            (viewBox.cy || 0) +
                                                            24
                                                        }
                                                        className="fill-muted-foreground"
                                                    >
                                                        {count === 0
                                                            ? 'Aucun'
                                                            : title}
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                )}
            </div>
        </div>
    );
};
