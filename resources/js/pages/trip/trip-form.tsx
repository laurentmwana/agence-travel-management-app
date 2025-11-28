import InputError from '@/components/input-error';
import { ButtonLoader } from '@/components/ui/button-loader';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectGenerate } from '@/components/ui/select-generate';
import { Textarea } from '@/components/ui/textarea';
import { getItineraryTypeIcon } from '@/features/itinerary';
import { useFetch } from '@/hooks/use-fetch';
import json from '@/routes/json';
import trip from '@/routes/trip';
import { Itinerary, Trip } from '@/types/model';
import { useForm } from '@inertiajs/react';
import React, { FormEvent } from 'react';

interface Props {
    entity?: Trip;
}

export const TripForm: React.FC<Props> = ({ entity }) => {
    const itineraries = useFetch<{ data: Itinerary[] }>(
        json.itinerary.index().url,
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
        itinerary_id: entity?.itinerary.id ?? '',
        total_cost: entity?.total_cost ?? 0,
        other_expenses: entity?.other_expenses ?? 0,
        fuel_cost: entity?.fuel_cost ?? 0,
        revenue: entity?.revenue ?? 0,
        observation: entity?.observation ?? '',
        perfomed_at: entity?.perfomed_at ?? '',
    });

    const onCloseModal = () => {
        resetAndClearErrors();
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (entity) {
            put(trip.update({ id: entity.id }).url, {
                onSuccess: onCloseModal,
                preserveScroll: true,
                preserveState: true,
            });
        } else {
            post(trip.store().url, {
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
                        <Label>Itinéraire</Label>
                        <SelectGenerate
                            isPending={itineraries.isPending}
                            onChange={(v) =>
                                setData('itinerary_id', v.toString())
                            }
                            value={data.itinerary_id}
                            options={
                                itineraries.fetchData?.data?.map((d) => {
                                    const Icontype = getItineraryTypeIcon(
                                        d.type,
                                    );
                                    return {
                                        name: (
                                            <div className="flex items-center gap-1">
                                                <Icontype size={13} />
                                                <span>
                                                    {d.start.name} -{' '}
                                                    {d.end.name}
                                                </span>
                                            </div>
                                        ),
                                        value: d.id.toString(),
                                    };
                                }) ?? []
                            }
                        />
                        <InputError message={errors.itinerary_id} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Date</Label>
                        <Input
                            type="datetime-local"
                            value={data.perfomed_at}
                            onChange={(e) =>
                                setData('perfomed_at', e.target.value)
                            }
                        />
                        <InputError message={errors.perfomed_at} />
                    </div>

                    {/* Coût du carburant */}
                    <div className="grid gap-2">
                        <Label>Coût du carburant</Label>
                        <Input
                            type="number"
                            value={data.fuel_cost}
                            onChange={(e) =>
                                setData('fuel_cost', parseFloat(e.target.value))
                            }
                        />
                        <InputError message={errors.fuel_cost} />
                    </div>

                    {/* Frais Divers */}
                    <div className="grid gap-2">
                        <Label>Frais Divers</Label>
                        <Input
                            type="number"
                            value={data.other_expenses}
                            onChange={(e) =>
                                setData(
                                    'other_expenses',
                                    parseFloat(e.target.value),
                                )
                            }
                        />
                        <InputError message={errors.other_expenses} />
                    </div>

                    {/* Revenue */}
                    <div className="grid gap-2">
                        <Label>Revenue</Label>
                        <Input
                            type="number"
                            value={data.revenue}
                            onChange={(e) =>
                                setData('revenue', parseFloat(e.target.value))
                            }
                        />
                        <InputError message={errors.revenue} />
                    </div>

                    {/* Trajet programmé */}

                    {/* Obervation */}
                    <div className="grid gap-2">
                        <Label>Obervation</Label>
                        <Textarea
                            value={data.observation ?? ''}
                            onChange={(e) =>
                                setData('observation', e.target.value)
                            }
                        />
                        <InputError message={errors.observation} />
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
