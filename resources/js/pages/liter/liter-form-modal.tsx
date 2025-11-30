import InputError from '@/components/input-error';
import { ButtonLoader } from '@/components/ui/button-loader';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { InputDecimal } from '@/components/ui/input-decimal';
import liter from '@/routes/liter';
import { useForm } from '@inertiajs/react';
import React, { FormEvent } from 'react';

interface LiterFormModalProps {
    amount: number;
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const LiterFormModal: React.FC<LiterFormModalProps> = ({
    amount,
    open,
    setOpen,
}) => {
    const { processing, data, setData, errors, post, resetAndClearErrors } =
        useForm({
            price_unit_liter: amount.toString() ?? '0.7',
        });

    const onCloseModal = () => {
        setOpen(false);
        resetAndClearErrors();
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(liter.store().url, {
            onSuccess: () => {
                // Handle success for update
                onCloseModal();
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div>
            <div>
                <Dialog open={open} onOpenChange={() => onCloseModal()}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Mettre à jour le prix du litre de carburant
                            </DialogTitle>
                        </DialogHeader>

                        <form onSubmit={onSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <InputDecimal
                                        label="Montant (en $) :"
                                        value={data.price_unit_liter}
                                        onValidValue={(v) =>
                                            setData('price_unit_liter', v)
                                        }
                                    />
                                    <InputError
                                        message={errors.price_unit_liter}
                                    />
                                </div>

                                <ButtonLoader loader={processing}>
                                    Mettre à jour
                                </ButtonLoader>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
