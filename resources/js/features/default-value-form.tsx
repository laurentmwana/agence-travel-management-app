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

interface DefaultValueFormProps {
    amount: number;
    open: boolean;
    setOpen: (v: boolean) => void;
    key: 'price_unit_liter' | 'price_acmi';
    url: string;
    title: string;
}

export const DefaultValueForm: React.FC<DefaultValueFormProps> = ({
    amount,
    open,
    setOpen,
    key,
    url,
    title,
}) => {
    const { processing, data, setData, errors, post, resetAndClearErrors } =
        useForm<Record<string, number>>({
            price_unit_liter: amount,
            price_acmi: amount,
        });

    const onCloseModal = () => {
        setOpen(false);
        resetAndClearErrors();
        setData(
            key === 'price_acmi' ? 'price_acmi' : 'price_unit_liter',
            amount,
        );
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(url, {
            onSuccess: () => {
                onCloseModal();
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={() => onCloseModal()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid w-full gap-2">
                            <Label htmlFor={key}>Montant (en $) :</Label>
                            <InputDecimal
                                className="w-full"
                                value={
                                    key === 'price_acmi'
                                        ? (data.price_acmi ?? 0)
                                        : (data.price_unit_liter ?? 0)
                                }
                                onChange={(v) =>
                                    setData(
                                        key === 'price_acmi'
                                            ? 'price_acmi'
                                            : 'price_unit_liter',
                                        v ?? 0,
                                    )
                                }
                            />
                            <InputError
                                message={
                                    key === 'price_acmi'
                                        ? (errors.price_acmi as string)
                                        : (errors.price_unit_liter as string)
                                }
                            />
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
