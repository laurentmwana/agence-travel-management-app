'use client';
import { Auth } from '@/types';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Welcome({ auth }: { auth: Auth }) {
    return (
        <>
            <div className="flex min-h-screen flex-col items-center bg-background px-4 py-6 text-foreground lg:justify-center lg:p-8">
                {/* NAV */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl"
                >
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href="/dashboard"
                                className="inline-block rounded-sm border border-border bg-background px-5 py-1.5 text-sm leading-normal text-foreground transition-all hover:scale-105 hover:border-foreground/30 hover:bg-muted"
                            >
                                Tableau de bord
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-foreground transition-all hover:scale-105 hover:border-border hover:bg-muted"
                                >
                                    Connexion
                                </Link>
                            </>
                        )}
                    </nav>
                </motion.header>

                {/* CONTENT */}
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow">
                    <main className="flex w-full max-w-[455px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        {/* LEFT CARD */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            className="flex-1 rounded-br-lg rounded-bl-lg border border-border bg-card p-6 pb-12 text-[13px] leading-[20px] shadow-sm lg:rounded-tl-lg lg:rounded-br-none lg:p-20"
                        >
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="mb-3 text-2xl leading-tight font-semibold tracking-tight text-balance text-foreground lg:text-3xl"
                            >
                                Gérez votre entreprise de transport
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="mb-6 leading-relaxed text-pretty text-muted-foreground"
                            >
                                Votre tableau de bord tout-en-un pour suivre les
                                trajets, les revenus, les dépenses et les
                                bénéfices.
                                <br />
                                <br />
                                Voici ce que vous pouvez suivre instantanément :
                            </motion.p>

                            {/* TIMELINE */}
                            <ul className="mb-8 flex flex-col gap-1 lg:mb-10">
                                <motion.li
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="relative flex items-start gap-4 py-3 before:absolute before:top-8 before:left-[0.6875rem] before:h-[calc(100%+0.25rem)] before:border-l before:border-border"
                                >
                                    <span className="relative mt-1 shrink-0 bg-card">
                                        <span className="flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full border-2 border-primary bg-card shadow-sm">
                                            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
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
                                </motion.li>

                                <motion.li
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    className="relative flex items-start gap-4 py-3 before:absolute before:top-0 before:left-[0.6875rem] before:h-8 before:border-l before:border-border after:absolute after:top-8 after:left-[0.6875rem] after:h-[calc(100%+0.25rem)] after:border-l after:border-border"
                                >
                                    <span className="relative mt-1 shrink-0 bg-card">
                                        <span className="flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full border-2 border-primary bg-card shadow-sm">
                                            <span className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:200ms]" />
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
                                </motion.li>

                                <motion.li
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                    className="relative flex items-start gap-4 py-3 before:absolute before:top-0 before:left-[0.6875rem] before:h-8 before:border-l before:border-border"
                                >
                                    <span className="relative mt-1 shrink-0 bg-card">
                                        <span className="flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full border-2 border-primary bg-card shadow-sm">
                                            <span className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:400ms]" />
                                        </span>
                                    </span>
                                    <span className="text-card-foreground">
                                        <strong className="font-semibold">
                                            Trajets
                                        </strong>
                                        {' — '}
                                        Nombre de trajets, liste des trajets.
                                    </span>
                                </motion.li>
                            </ul>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.9 }}
                                className="flex gap-3"
                            >
                                <Link
                                    href={auth.user ? '/dashboard' : '/login'}
                                    className="inline-block rounded-sm border border-primary bg-primary px-6 py-2.5 text-sm leading-normal font-medium text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90 hover:shadow-lg"
                                >
                                    {auth.user
                                        ? 'Accéder au tableau de bord'
                                        : 'Commencer maintenant'}
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* RIGHT IMAGE */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg border border-border bg-gradient-to-br from-sky-100 to-blue-200 lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg dark:from-sky-950 dark:to-blue-900"
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative h-full w-full">
                                    {/* Clouds */}
                                    <motion.svg
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: 0.4,
                                            scale: 1,
                                            y: [0, -15, 0],
                                        }}
                                        transition={{
                                            opacity: {
                                                duration: 1,
                                                delay: 0.5,
                                            },
                                            scale: { duration: 1, delay: 0.5 },
                                            y: {
                                                duration: 6,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: 'easeInOut',
                                            },
                                        }}
                                        className="absolute top-12 left-8 h-16 w-16 text-white/40 dark:text-white/10"
                                        viewBox="0 0 64 64"
                                        fill="currentColor"
                                    >
                                        <path d="M52 32c0-4.4-3.6-8-8-8-1.5 0-2.9.4-4.1 1.1C38.7 21.7 35.1 19 31 19c-5.5 0-10 4.5-10 10 0 .3 0 .6.1.9C18.3 30.6 16 33.1 16 36c0 3.9 3.1 7 7 7h26c4.4 0 8-3.6 8-8z" />
                                    </motion.svg>

                                    <motion.svg
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: 0.3,
                                            scale: 1,
                                            y: [0, -20, 0],
                                        }}
                                        transition={{
                                            opacity: {
                                                duration: 1,
                                                delay: 0.7,
                                            },
                                            scale: { duration: 1, delay: 0.7 },
                                            y: {
                                                duration: 8,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: 'easeInOut',
                                                delay: 2,
                                            },
                                        }}
                                        className="absolute top-32 right-12 h-20 w-20 text-white/30 dark:text-white/10"
                                        viewBox="0 0 64 64"
                                        fill="currentColor"
                                    >
                                        <path d="M52 32c0-4.4-3.6-8-8-8-1.5 0-2.9.4-4.1 1.1C38.7 21.7 35.1 19 31 19c-5.5 0-10 4.5-10 10 0 .3 0 .6.1.9C18.3 30.6 16 33.1 16 36c0 3.9 3.1 7 7 7h26c4.4 0 8-3.6 8-8z" />
                                    </motion.svg>

                                    {/* Airplane avec animation fluide */}
                                    <motion.svg
                                        initial={{
                                            opacity: 0,
                                            scale: 0.5,
                                            rotate: -45,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            x: [-100, 80, 80, -80, -100],
                                            y: [100, -50, 80, 20, 100],
                                            rotate: [-45, 0, 45, -20, -45],
                                        }}
                                        transition={{
                                            opacity: {
                                                duration: 1,
                                                delay: 0.3,
                                            },
                                            scale: { duration: 1, delay: 0.3 },
                                            x: {
                                                duration: 20,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: 'linear',
                                            },
                                            y: {
                                                duration: 20,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: 'linear',
                                            },
                                            rotate: {
                                                duration: 20,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: 'linear',
                                            },
                                        }}
                                        className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 text-primary drop-shadow-lg"
                                        viewBox="0 0 256 256"
                                        fill="currentColor"
                                    >
                                        <path d="M235.58,128.84,160,155.43V192a16,16,0,0,1-16,16H112a16,16,0,0,1-16-16V155.43L20.42,128.84A8,8,0,0,1,16,121.34V104a8,8,0,0,1,9.57-7.84L96,108.92V48a8,8,0,0,1,2.34-5.66l32-32a8,8,0,0,1,11.32,0l32,32A8,8,0,0,1,176,48v60.92l70.43-12.76A8,8,0,0,1,256,104v17.34A8,8,0,0,1,235.58,128.84Z" />
                                    </motion.svg>

                                    {/* Flight path animé */}
                                    <motion.svg
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.2 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="absolute inset-0 h-full w-full"
                                    >
                                        <motion.path
                                            d="M 20 180 Q 120 80 236 100"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeDasharray="8 8"
                                            className="text-primary"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{
                                                duration: 3,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: 'linear',
                                            }}
                                        />
                                    </motion.svg>
                                </div>
                            </div>
                        </motion.div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
