import { CollectionActionClickable } from '@/components/collection-action';
import { TableHeadSortable } from '@/components/ui/sortable-head';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ago } from '@/lib/date';
import tax from '@/routes/tax';
import { Tax } from '@/types/model';
import { PlusIcon } from 'lucide-react';

import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import { TaxHoverCard } from '@/features/tax/tax-hover-card';
import { formatLargeNumber } from '@/lib/number';
import React from 'react';
import { TaxFormModal } from './tax-form-modal';
import { PriceHoverCard } from '@/features/price-hover-card';

interface TaxTableProps {
    taxes: Tax[];
}

export const TaxTable: React.FC<TaxTableProps> = ({ taxes }) => {
    const [openFormUpdateModalId, setOpenFormUpdateModalId] = React.useState<
        string | null
    >(null);
    const [openFormCreateModalId, setOpenFormCreateModalId] =
        React.useState<boolean>(false);
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setOpenFormCreateModalId(true)}
                    >
                        <PlusIcon size={15} />
                    </Button>
                    <TaxFormModal
                        open={openFormCreateModalId}
                        setOpen={setOpenFormCreateModalId}
                    />
                </div>

                <SearchInput />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeadSortable field="id">ID</TableHeadSortable>
                        <TableHeadSortable field="name">Nom</TableHeadSortable>
                        <TableHeadSortable field="name">
                            Montant ($)
                        </TableHeadSortable>
                        <TableHead>Créer</TableHead>
                        <TableHead className="text-end">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {taxes.map((item) => {
                        return (
                            <React.StrictMode key={item.id}>
                                <TableRow>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>
                                        <TaxHoverCard tax={item} />
                                    </TableCell>
                                    <TableCell>
                                        <PriceHoverCard price={item.amount} />
                                    </TableCell>
                                    <TableCell>
                                        {ago(item.created_at)}
                                    </TableCell>
                                    <TableCell>
                                        <TaxFormModal
                                            entity={item}
                                            open={
                                                openFormUpdateModalId ===
                                                item.id
                                            }
                                            setOpen={(v) =>
                                                setOpenFormUpdateModalId(
                                                    v ? item.id : null,
                                                )
                                            }
                                        />
                                        <CollectionActionClickable
                                            onRouteEdit={() =>
                                                setOpenFormUpdateModalId(
                                                    item.id,
                                                )
                                            }
                                            routeDelete={
                                                tax.destroy({
                                                    id: item.id,
                                                }).url
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            </React.StrictMode>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
