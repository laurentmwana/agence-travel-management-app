import InputError from '@/components/input-error';
import { ButtonLoader } from '@/components/ui/button-loader';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import tax from '@/routes/tax';
import { Tax } from '@/types/model';
import { useForm } from '@inertiajs/react';
import React, { FormEvent } from 'react';

interface TaxFormModalProps {
    entity?: Tax;
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const TaxFormModal: React.FC<TaxFormModalProps> = ({
    entity,
    open,
    setOpen,
}) => {
    const {
        processing,
        data,
        setData,
        errors,
        put,
        post,
        resetAndClearErrors,
    } = useForm({
        id: entity ? entity.id : '',
        name: entity ? entity.name : '',
        amount: entity ? entity.amount : 0,
        description: entity ? entity.description : '',
    });

    const onCloseModal = () => {
        setOpen(false);
        resetAndClearErrors();
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        entity
            ? put(tax.update({ id: entity.id }).url, {
                  onSuccess: () => {
                      // Handle success for update
                      onCloseModal();
                  },
                  preserveScroll: true,
                  preserveState: true,
              })
            : post(tax.store().url, {
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
                                {entity ? 'Modifier' : 'Créer'} une taxe
                            </DialogTitle>
                        </DialogHeader>

                        <form onSubmit={onSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nom</Label>
                                    <Input
                                        id="name"
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        value={data.name}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="amount">Montant</Label>
                                    <Input
                                        id="amount"
                                        onChange={(e) =>
                                            setData(
                                                'amount',
                                                parseFloat(e.target.value),
                                            )
                                        }
                                        value={data.amount}
                                    />
                                    <InputError message={errors.amount} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        value={data.description}
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                <ButtonLoader loader={processing}>
                                    {entity ? 'Mettre à jour' : 'Créer'}
                                </ButtonLoader>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
