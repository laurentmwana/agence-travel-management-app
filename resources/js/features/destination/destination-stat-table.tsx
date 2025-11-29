import { TableHeadSortable } from '@/components/ui/sortable-head';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { DestinationHoverCard } from '@/features/destination/destination-hover-card';
import { ago } from '@/lib/date';
import { Destination } from '@/types/model';
import React from 'react';

interface DestinationStatTableProps {
    destinations: Destination[];
}

export const DestinationStatTable: React.FC<DestinationStatTableProps> = ({
    destinations,
}) => {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeadSortable field="id">ID</TableHeadSortable>
                        <TableHeadSortable field="name">Nom</TableHeadSortable>
                        <TableHead>Créer</TableHead>
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
                                </TableRow>
                            </React.StrictMode>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
