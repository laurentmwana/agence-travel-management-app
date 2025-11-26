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
import destination from '@/routes/destination';
import { Destination } from '@/types/model';
import { useForm } from '@inertiajs/react';
import React, { FormEvent } from 'react';

interface DestinationFormModalProps {
    entity?: Destination;
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const DestinationFormModal: React.FC<DestinationFormModalProps> = ({
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
    });

        const onCloseModal = () => {
        setOpen(false);
        resetAndClearErrors('name');
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        entity
            ? put(destination.update({ id: entity.id }).url, {
                  onSuccess: () => {
                      // Handle success for update
                      onCloseModal()
                  },
                  preserveScroll: true,
                  preserveState: true,
              })
            : post(destination.store().url, {
                  onSuccess: () => {
                      // Handle success for update
                      onCloseModal()
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
                                {entity ? 'Modifier' : 'Créer'} une destination
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
