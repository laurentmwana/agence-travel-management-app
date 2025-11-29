import { CollectionActionUrl } from '@/components/collection-action';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import React from 'react';

import { SearchInput } from '@/components/search-input';
import { Badge } from '@/components/ui/badge';
import { SelectGenerate } from '@/components/ui/select-generate';
import { TableHeadSortable } from '@/components/ui/sortable-head';
import { DestinationHoverCard } from '@/features/destination/destination-hover-card';
import { getItineraryTypeIcon } from '@/features/itinerary';
import { useFetch } from '@/hooks/use-fetch';
import { useParams } from '@/hooks/use-params';
import itinerary from '@/routes/itinerary';
import json from '@/routes/json';
import { Itinerary, ItineraryType } from '@/types/model';
import { router } from '@inertiajs/react';

interface ItineraryStatTableProps {
    itineraries: Itinerary[];
    defaultType: string;
}

export const ItineraryStatTable: React.FC<ItineraryStatTableProps> = ({
    itineraries,
    defaultType,
}) => {
    const fetchItinerariesType = useFetch<{ data: ItineraryType[] }>(
        json.itinerary.type().url,
    );
    const { mergeParams } = useParams();

    const getRouteFilterByType = (type: string) =>
        mergeParams(window.location.pathname, {
            type: type,
        });

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <SearchInput />
                <SelectGenerate
                    className="md:w-50"
                    value={defaultType}
                    isPending={fetchItinerariesType.isPending}
                    placeholder="Types"
                    onChange={(v) => router.visit(getRouteFilterByType(v))}
                    options={
                        fetchItinerariesType.fetchData?.data.map((type) => ({
                            value: type,
                            name: type,
                            selected: type === defaultType,
                        })) ?? []
                    }
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Départ</TableHead>
                        <TableHead>Arriver</TableHead>
                        <TableHeadSortable field="type">Type</TableHeadSortable>
                        <TableHeadSortable field="is_scheduled">
                            Programmer
                        </TableHeadSortable>
                        <TableHead className="text-end">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {itineraries.map((item) => {
                        const IconType = getItineraryTypeIcon(item.type);
                        return (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <DestinationHoverCard
                                        destination={item.start}
                                    />
                                </TableCell>{' '}
                                <TableCell>
                                    <DestinationHoverCard
                                        destination={item.end}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <IconType size={15} />
                                        <span>{item.type}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            item.is_scheduled
                                                ? 'secondary'
                                                : 'destructive'
                                        }
                                    >
                                        {item.is_scheduled ? 'Oui' : 'Non'}
                                    </Badge>
                                </TableCell>{' '}
                                <TableCell>
                                    <CollectionActionUrl
                                        routeDelete={
                                            itinerary.destroy({
                                                id: item.id,
                                            }).url
                                        }
                                        routeEdit={
                                            itinerary.edit({
                                                id: item.id,
                                            }).url
                                        }
                                        routeShow={
                                            itinerary.show({
                                                id: item.id,
                                            }).url
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
