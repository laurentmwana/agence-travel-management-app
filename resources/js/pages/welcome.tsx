import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Bienvenue">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-background p-6 text-foreground lg:justify-center lg:p-8">
                {/* NAV */}
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-border bg-background px-5 py-1.5 text-sm leading-normal text-foreground transition-colors hover:border-foreground/30 hover:bg-muted"
                            >
                                Tableau de bord
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-foreground transition-colors hover:border-border hover:bg-muted"
                                >
                                    Connexion
                                </Link>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="inline-block rounded-sm border border-border bg-background px-5 py-1.5 text-sm leading-normal text-foreground transition-colors hover:border-foreground/30 hover:bg-muted"
                                    >
                                        Inscription
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </header>

                {/* CONTENT */}
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[455px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        {/* LEFT CARD */}
                        <div className="flex-1 rounded-br-lg rounded-bl-lg border border-border bg-card p-6 pb-12 text-[13px] leading-[20px] shadow-sm lg:rounded-tl-lg lg:rounded-br-none lg:p-20">
                            <h1 className="mb-3 text-2xl leading-tight font-semibold tracking-tight text-balance text-foreground lg:text-3xl">
                                Gérez votre entreprise de transport
                            </h1>
                            <p className="mb-6 leading-relaxed text-pretty text-muted-foreground">
                                Votre tableau de bord tout-en-un pour suivre les
                                trajets, les revenus, les dépenses et les
                                bénéfices.
                                <br />
                                <br />
                                Voici ce que vous pouvez suivre instantanément :
                            </p>

                            {/* TIMELINE */}
                            <ul className="mb-8 flex flex-col gap-1 lg:mb-10">
                                {/* Bénéfice */}
                                <li className="relative flex items-start gap-4 py-3 before:absolute before:top-8 before:left-[0.6875rem] before:h-[calc(100%+0.25rem)] before:border-l before:border-border">
                                    <span className="relative mt-1 shrink-0 bg-card">
                                        <span className="flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full border-2 border-primary bg-card shadow-sm">
                                            <span className="h-2 w-2 rounded-full bg-primary" />
                                        </span>
                                    </span>
                                    <span className="text-card-foreground">
                                        <strong className="font-semibold">
                                            Bénéfices quotidiens & mensuels
                                        </strong>
                                        {' — '}
                                        Calculés automatiquement à partir des
                                        ventes de trajets et des dépenses.
                                    </span>
                                </li>

                                {/* Dépenses */}
                                <li className="relative flex items-start gap-4 py-3 before:absolute before:top-0 before:left-[0.6875rem] before:h-8 before:border-l before:border-border after:absolute after:top-8 after:left-[0.6875rem] after:h-[calc(100%+0.25rem)] after:border-l after:border-border">
                                    <span className="relative mt-1 shrink-0 bg-card">
                                        <span className="flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full border-2 border-primary bg-card shadow-sm">
                                            <span className="h-2 w-2 rounded-full bg-primary" />
                                        </span>
                                    </span>
                                    <span className="text-card-foreground">
                                        <strong className="font-semibold">
                                            Coûts & Dépenses
                                        </strong>
                                        {' — '}
                                        Carburant, paiements chauffeurs,
                                        maintenance, commissions, etc.
                                    </span>
                                </li>

                                {/* Trajets */}
                                <li className="relative flex items-start gap-4 py-3 before:absolute before:top-0 before:left-[0.6875rem] before:h-8 before:border-l before:border-border">
                                    <span className="relative mt-1 shrink-0 bg-card">
                                        <span className="flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full border-2 border-primary bg-card shadow-sm">
                                            <span className="h-2 w-2 rounded-full bg-primary" />
                                        </span>
                                    </span>
                                    <span className="text-card-foreground">
                                        <strong className="font-semibold">
                                            Trajets
                                        </strong>
                                        {' — '}
                                        Nombre de trajets, liste des trajets.
                                    </span>
                                </li>
                            </ul>

                            {/* CTA */}
                            <div className="flex gap-3">
                                <Link
                                    href={auth.user ? dashboard() : login()}
                                    className="inline-block rounded-sm border border-primary bg-primary px-6 py-2.5 text-sm leading-normal font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                                >
                                    {auth.user
                                        ? 'Accéder au tableau de bord'
                                        : 'Commencer maintenant'}
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg border border-border bg-muted lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg">
                            <div className="absolute inset-0 rounded-t-lg lg:rounded-t-none lg:rounded-r-lg" />
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
