'use client';

import { router } from '@inertiajs/react';
import { Database } from 'lucide-react';
import type { FC, PropsWithChildren } from 'react';
import { Button } from './ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

type Props = PropsWithChildren<{
    message?: string;
    countable: number;
}>;

export const EmptyCollection: FC<Props> = ({
    message,
    countable,
    children,
}) => {
    const handleReset = () => {
        router.get(window.location.pathname, {}, { preserveState: false });
    };

    if (countable === 0) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Card className="w-full max-w-4xl">
                    <CardHeader className="space-y-4 text-center">
                        <div className="flex justify-center">
                            <Database className="size-12 text-muted-foreground" />
                        </div>

                        <CardTitle>
                            {window.__('empty-collection.title')}
                        </CardTitle>

                        <CardDescription>
                            {message ?? window.__('empty-collection.description')}
                        </CardDescription>

                        <Button
                            onClick={handleReset}
                            variant="outline"
                            className="mt-4 bg-transparent"
                        >
                            {window.__('empty-collection.reset_filters')}
                        </Button>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return children;
};
