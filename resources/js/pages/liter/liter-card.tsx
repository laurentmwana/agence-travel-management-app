import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { DefaultValueForm } from '@/features/default-value-form';
import liter from '@/routes/liter';
import { Pen } from 'lucide-react';
import React from 'react';

interface Props {
    amount: number;
}

export const LiterCard: React.FC<Props> = ({ amount }) => {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <div className="space-y-4">
            <Card className="shadow-none">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-lg font-semibold text-muted-foreground">
                        1 litre équivaut à
                    </CardTitle>

                    <CardDescription className="text-3xl font-bold text-primary">
                        {amount}$
                    </CardDescription>
                </CardHeader>

                <CardFooter className="flex justify-center pt-0">
                    <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => setOpen(true)}
                    >
                        <Pen className="h-4 w-4" />
                        <span>Éditer</span>
                    </Button>
                </CardFooter>
            </Card>

            <DefaultValueForm
                fieldKey="price_unit_liter"
                amount={amount}
                open={open}
                setOpen={setOpen}
                url={liter.store().url}
                title="Mettre à jour le montant de litre"
            />
        </div>
    );
};
