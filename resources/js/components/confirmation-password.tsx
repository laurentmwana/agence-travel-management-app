'use client';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { FC, type FormEventHandler, useRef } from 'react';
import { Input } from './ui/input';

type Props = {
    url: string;
    open?: boolean;
    setOpen?: (v: boolean) => void;
    onSuccess?: () => void;
    onError?: () => void;
    method?: 'post' | 'delete' | 'put';
};

export const ConfirmationPassword: FC<Props> = ({
    url,
    open,
    setOpen,
    onSuccess,
    onError,
    method = 'delete',
}) => {
    const passwordInput = useRef<HTMLInputElement>(null);
    const {
        data,
        setData,
        delete: destroy,
        post,
        put,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm<Required<{ password: string }>>({ password: '' });

    const options = {
        preserveScroll: true,
        onSuccess: () => {
            closeModal();
            onSuccess?.();
        },
        onError: () => {
            passwordInput.current?.focus();
            onError?.();
        },
        onFinish: () => reset(),
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (method === 'post') {
            post(url, options);
        } else if (method === 'put') {
            put(url, options);
        } else {
            destroy(url, options);
        }
    };

    const closeModal = () => {
        clearErrors();
        reset();
        setOpen?.(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogTitle>
                    {window.__('confirmation-password.dialogTitle')}
                </DialogTitle>
                <DialogDescription>
                    {window.__('confirmation-password.dialogDescription')}
                </DialogDescription>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="password" className="sr-only">
                            {window.__('confirmation-password.passwordLabel')}
                        </Label>
                        <Input
                            disabled={processing}
                            id="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            placeholder={window.__(
                                'confirmation-password.passwordPlaceholder',
                            )}
                            autoComplete="current-password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                {window.__('confirmation-password.cancel')}
                            </Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            disabled={processing}
                            type="submit"
                        >
                            {processing
                                ? window.__('confirmation-password.processing')
                                : window.__('confirmation-password.confirm')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
