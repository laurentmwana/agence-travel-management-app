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
import destination from '@/routes/destination';
import { Destination } from '@/types/model';
import { PlusIcon } from 'lucide-react';

import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import React from 'react';
import { DestinationHoverCard } from '../../features/destination/destination-hover-card';
import { DestinationFormModal } from './destination-form-modal';

interface DestinationTableProps {
    destinations: Destination[];
}

export const DestinationTable: React.FC<DestinationTableProps> = ({
    destinations,
}) => {
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
                    <DestinationFormModal
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
                        <TableHead>Créer</TableHead>
                        <TableHead className="text-end">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {destinations.map((item) => {
                        return (
                            <React.StrictMode key={item.id}>
                                <TableRow>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>
                                        <DestinationHoverCard
                                            destination={item}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {ago(item.created_at)}
                                    </TableCell>
                                    <TableCell>
                                        <DestinationFormModal
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
                                                destination.destroy({
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
