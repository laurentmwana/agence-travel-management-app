import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Base route / trajectoire */}
            <path
                d="M4 40L24 8L44 40H28L24 32L20 40H4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Position markers */}
            <circle cx="24" cy="8" r="3" fill="currentColor" />
            <circle cx="4" cy="40" r="3" fill="currentColor" />
            <circle cx="44" cy="40" r="3" fill="currentColor" />
        </svg>
    );
}
