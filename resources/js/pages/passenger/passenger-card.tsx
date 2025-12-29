import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { DefaultValueForm } from '@/features/default-value-form';
import passenger from '@/routes/passenger';
import { Pen } from 'lucide-react';
import React from 'react';

interface Props {
    amount: number;
}

export const PassengerCard: React.FC<Props> = ({ amount }) => {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <div className="space-y-4">
            <Card className="shadow-none">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-lg font-semibold text-muted-foreground">
                        1 passanger paye
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
                key="price_unit_passenger"
                amount={amount}
                open={open}
                setOpen={setOpen}
                url={passenger.store().url}
                title="Éditer le prix par passanger"
            />
        </div>
    );
};
