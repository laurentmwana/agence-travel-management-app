import InputError from '@/components/input-error';
import { ButtonLoader } from '@/components/ui/button-loader';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { Input } from '@/components/ui/input';
import { InputJson } from '@/components/ui/input-json';
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
        other_expenses: entity?.other_expenses ?? [],
        affretements: entity?.affretements ?? [],
        fuel_quantity: entity?.fuel_quantity ?? 0,
        duration_hours: entity?.duration_hours ?? 1,
        number_of_passenger: entity?.number_of_passenger ?? 1,
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
                    {/* Itinéraire */}
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
                                                    {d.start.name} →{' '}
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
                        <DateTimePicker
                            value={data.perfomed_at}
                            onChange={(v) => setData('perfomed_at', v ?? '')}
                        />
                        <InputError message={errors.perfomed_at} />
                    </div>

                    {/* Quantité du carburant */}
                    <div className="grid gap-2">
                        <Label>Quantité du carburant</Label>
                        <Input
                            type="number"
                            value={data.fuel_quantity}
                            onChange={(e) =>
                                setData(
                                    'fuel_quantity',
                                    parseFloat(e.target.value),
                                )
                            }
                        />
                        <InputError message={errors.fuel_quantity} />
                    </div>

                    {/* Durée en heures */}
                    <div className="grid gap-2">
                        <Label>Durée en heures</Label>
                        <Input
                            type="number"
                            value={data.duration_hours}
                            onChange={(e) =>
                                setData(
                                    'duration_hours',
                                    parseFloat(e.target.value),
                                )
                            }
                        />
                        <InputError message={errors.duration_hours} />
                    </div>

                    {/* Durée en heures */}
                    <div className="grid gap-2">
                        <Label>Nombre de passanger</Label>
                        <Input
                            type="number"
                            value={data.number_of_passenger}
                            onChange={(e) =>
                                setData(
                                    'number_of_passenger',
                                    parseFloat(e.target.value),
                                )
                            }
                        />
                        <InputError message={errors.number_of_passenger} />
                    </div>

                    {/* Autres depenses */}
                    <InputJson
                        label="Affretement"
                        error={errors.affretements}
                        value={data.affretements}
                        onChange={(v) => setData('affretements', v)}
                        placeholder="autres depenses"
                    />

                    {/* Autres depenses */}
                    <InputJson
                        label="Autres depenses"
                        error={errors.other_expenses}
                        value={data.other_expenses}
                        onChange={(v) => setData('other_expenses', v)}
                        placeholder="autres depenses"
                    />

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
