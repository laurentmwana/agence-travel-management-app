'use client';

import InputError from '@/components/input-error';
import { ButtonLoader } from '@/components/ui/button-loader';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { InputDecimal } from '@/components/ui/input-decimal';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import React, { FormEvent } from 'react';

type KeyType = 'price_unit_liter' | 'price_acmi' | 'price_unit_passenger';

interface DefaultValueFormProps {
    amount: number;
    open: boolean;
    setOpen: (v: boolean) => void;
    fieldKey: KeyType;
    url: string;
    title: string;
}

export const DefaultValueForm: React.FC<DefaultValueFormProps> = ({
    amount,
    open,
    setOpen,
    fieldKey,
    url,
    title,
}) => {
    const { processing, data, setData, errors, post, resetAndClearErrors } =
        useForm<Record<KeyType, number>>({
            price_unit_liter: amount,
            price_acmi: amount,
            price_unit_passenger: amount,
        });

    const formObject = {
        price_unit_liter: {
            data: data.price_unit_liter ?? 0,
            error: errors.price_unit_liter,
            onChange: (v: number) => setData('price_unit_liter', v),
        },
        price_acmi: {
            data: data.price_acmi ?? 0,
            error: errors.price_acmi,
            onChange: (v: number) => setData('price_acmi', v),
        },
        price_unit_passenger: {
            data: data.price_unit_passenger ?? 0,
            error: errors.price_unit_passenger,
            onChange: (v: number) => setData('price_unit_passenger', v),
        },
    };

    const form = formObject[fieldKey];

    const onCloseModal = () => {
        setOpen(false);
        resetAndClearErrors();
        setData({
            price_acmi: 0,
            price_unit_liter: 0,
            price_unit_passenger: 0,
        });
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(url, {
            onSuccess: onCloseModal,
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid w-full gap-2">
                            <Label htmlFor={fieldKey}>Montant (en $) :</Label>

                            <InputDecimal
                                id={fieldKey}
                                className="w-full"
                                value={form.data}
                                onChange={form.onChange}
                            />

                            <InputError message={form.error} />
                        </div>

                        <ButtonLoader loader={processing}>
                            Mettre à jour
                        </ButtonLoader>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
