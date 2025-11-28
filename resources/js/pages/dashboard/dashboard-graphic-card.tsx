'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { SelectGenerate } from '@/components/ui/select-generate';
import { DashboardGraphicItem } from '@/types/model';
import { router } from '@inertiajs/react';

export const description = 'An interactive area chart';

const chartConfig = {
    total_cost: {
        label: 'Dépense',
        color: 'var(--chart-1)',
    },
    net_profit: {
        label: 'Bénéfice Net',
        color: 'var(--chart-2)',
    },
} satisfies ChartConfig;

type DashboardGraphicCardProps = {
    chartData: DashboardGraphicItem[];
    defaultYear: string;
    years: Array<string>;
};

export const DashboardGraphicCard: React.FC<DashboardGraphicCardProps> = ({
    chartData,
    defaultYear,
    years,
}) => {
    const [timeRange, setTimeRange] = React.useState('90d');

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date);
        const referenceDate = new Date('2024-06-30');
        let daysToSubtract = 90;
        if (timeRange === '30d') {
            daysToSubtract = 30;
        } else if (timeRange === '7d') {
            daysToSubtract = 7;
        }
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2">
                <div>
                    <CardTitle>Statistiques Financières</CardTitle>
                    <CardDescription>
                        Bénéfice Net, Dépense Total
                    </CardDescription>
                </div>
                <SelectGenerate
                    className="w-[200px]"
                    value={defaultYear}
                    options={years.map((y) => {
                        return {
                            name: y,
                            value: y,
                            disabled: y.toString() == defaultYear,
                        };
                    })}
                    onChange={(v) =>
                        router.get(window.location.pathname, { year: v })
                    }
                />
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient
                                id="fillTotalCost"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-total_cost)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-total_cost)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient
                                id="fillNetProfit"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-net_profit)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-net_profit)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('fr-FR', {
                                    month: 'short',
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value,
                                        ).toLocaleDateString('fr-FR', {
                                            month: 'short',
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="net_profit"
                            type="natural"
                            fill="url(#fillNetProfit)"
                            stroke="var(--color-net_profit)"
                            stackId="a"
                        />
                        <Area
                            dataKey="total_cost"
                            type="natural"
                            fill="url(#fillTotalCost)"
                            stroke="var(--color-total_cost)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
