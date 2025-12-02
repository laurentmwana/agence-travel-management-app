'use client';

import { QueriesProps } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';

export const SearchInput: FC = () => {
    const { search } = usePage<QueriesProps>().props.query;
    const { get, data, processing, setData, reset } = useForm({
        search: search,
    });

    const [open, setOpen] = useState(false);
    const [isDisable, setIsDisable] = useState<boolean>(true);

    const handleClear = () => {
        reset('search');
        setData('search', '');
        router.visit(window.location.pathname, {
            preserveScroll: true,
        });
        setOpen(false);
        setIsDisable(true);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        get(window.location.pathname, {
            preserveScroll: true,
        });

        setOpen(false);
    };

    const handleInputSearch = (value?: string) => {
        setData('search', value);
        if (!value || value.length < 1) {
            setIsDisable(true);
            return;
        }
        setIsDisable(false);
    };

    const searchForm = (
        <form className="flex items-center gap-1" onSubmit={handleSubmit}>
            <div className="relative flex-1">
                <Input
                    placeholder="Recherche..."
                    className="h-8 pr-8"
                    id="search"
                    name="search"
                    onChange={(e) => handleInputSearch(e.target.value)}
                    disabled={processing}
                    value={data.search}
                />

                {!isDisable && (
                    <Button
                        disabled={processing}
                        type="button"
                        size="icon"
                        variant="outline"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={handleClear}
                    >
                        <X size={14} />
                    </Button>
                )}
            </div>

            <Button
                disabled={processing || isDisable}
                size="sm"
                variant="outline"
                className="h-8"
            >
                <Search size={14} />
            </Button>
        </form>
    );

    return (
        <>
            <div className="hidden md:flex">{searchForm}</div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild className="flex md:hidden">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-2 bg-transparent"
                    >
                        <Search size={14} />
                        <span className="text-muted-foreground">
                            Recherche...
                        </span>
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Que cherchez-vous ?
                        </DialogTitle>
                    </DialogHeader>

                    {searchForm}
                </DialogContent>
            </Dialog>
        </>
    );
};
