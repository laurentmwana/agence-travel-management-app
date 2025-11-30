import InputError from '@/components/input-error';
import { ButtonLoader } from '@/components/ui/button-loader';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectGenerate } from '@/components/ui/select-generate';
import { getItineraryTypeIcon } from '@/features/itinerary';
import { useFetch } from '@/hooks/use-fetch';
import itinerary from '@/routes/itinerary';
import json from '@/routes/json';
import { Destination, Itinerary, ItineraryType } from '@/types/model';
import { useForm } from '@inertiajs/react';
import React, { FormEvent } from 'react';

interface ItineraryFormProps {
    entity?: Itinerary;
}

export const ItineraryForm: React.FC<ItineraryFormProps> = ({ entity }) => {
    const destinations = useFetch<{ data: Destination[] }>(
        json.destination.index().url,
    );
    const itinerariesTypes = useFetch<{ data: ItineraryType[] }>(
        json.itinerary.type().url,
    );
    const {
        processing,
        data,
        setData,
        errors,
        put,
        post,
        resetAndClearErrors,
    } = useForm({
        id: entity?.id ?? '',
        type: entity?.type ?? '',
        is_scheduled: entity?.is_scheduled?.toString() ?? '0',
        distance_km: entity?.distance_km ?? '0',
        start_destination_id: entity?.start?.id.toString() ?? '',
        end_destination_id: entity?.end?.id.toString() ?? '',
    });

    const onCloseModal = () => {
        resetAndClearErrors();
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (entity) {
            put(itinerary.update({ id: entity.id }).url, {
                onSuccess: onCloseModal,
                preserveScroll: true,
                preserveState: true,
            });
        } else {
            post(itinerary.store().url, {
                onSuccess: onCloseModal,
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    return (
        <div className="space-y-4">
            <form onSubmit={onSubmit}>
                <div className="grid gap-4 py-4">
                    {/* Départ */}
                    <div className="grid gap-2">
                        <Label>Départ</Label>
                        <SelectGenerate
                            isPending={destinations.isPending}
                            onChange={(v) =>
                                setData('start_destination_id', v.toString())
                            }
                            value={data.start_destination_id}
                            options={
                                destinations.fetchData?.data?.map((d) => ({
                                    name: d.name,
                                    value: d.id,
                                    disabled: d.id === data.end_destination_id,
                                })) ?? []
                            }
                        />
                        <InputError message={errors.start_destination_id} />
                    </div>

                    {/* Arrivée */}
                    <div className="grid gap-2">
                        <Label>Arrivée</Label>
                        <SelectGenerate
                            isPending={destinations.isPending}
                            onChange={(v) =>
                                setData('end_destination_id', v.toString())
                            }
                            value={data.end_destination_id}
                            options={
                                destinations.fetchData?.data?.map((d) => ({
                                    name: d.name,
                                    value: d.id,
                                    disabled:
                                        d.id === data.start_destination_id,
                                })) ?? []
                            }
                        />
                        <InputError message={errors.end_destination_id} />
                    </div>

                    {/* Type */}
                    <div className="grid gap-2">
                        <Label>Type de trajet</Label>
                        <SelectGenerate
                            isPending={itinerariesTypes.isPending}
                            onChange={(v) => setData('type', v.toString())}
                            value={data.type}
                            options={
                                itinerariesTypes.fetchData?.data.map((d) => {
                                    const IconType = getItineraryTypeIcon(d);
                                    return {
                                        name: (
                                            <div className="flex items-center gap-1">
                                                <IconType size={13} />
                                                <span>{d}</span>
                                            </div>
                                        ),
                                        value: d,
                                        disabled: d === data.type,
                                    };
                                }) ?? []
                            }
                        />
                        <InputError message={errors.type} />
                    </div>

                    {/* Distance */}
                    <div className="grid gap-2">
                        <Label>Distance (km)</Label>
                        <Input
                            type="number"
                            value={data.distance_km}
                            onChange={(e) =>
                                setData('distance_km', e.target.value)
                            }
                        />
                        <InputError message={errors.distance_km} />
                    </div>

                    {/* Trajet programmé */}

                    <div className="grid gap-2">
                        <Label>Trajet programmé ?</Label>
                        <SelectGenerate
                            value={data.is_scheduled}
                            onChange={(v) => setData('is_scheduled', v)}
                            options={[
                                { name: 'Oui', value: '1' },
                                { name: 'Non', value: '0' },
                            ]}
                        />
                        <InputError message={errors.is_scheduled} />
                    </div>

                    <div>
                        <ButtonLoader loader={processing}>
                            {entity ? 'Mettre à jour' : 'Créer'}
                        </ButtonLoader>
                    </div>
                </div>
            </form>
        </div>
    );
};
