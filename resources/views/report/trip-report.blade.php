{{-- resources/views/reports/trips-summary.blade.php --}}
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Rapport Résumé - {{ $year ?? 'Année' }}/{{ $month ?? 'Mois' }}/{{ $day ?? 'Jour' }}</title>
    <style>
        @page { margin: 20mm; }
        body { 
            font-family: DejaVu Sans, sans-serif; 
            font-size: 12px; 
            line-height: 1.5; 
            color: #000; 
            width: 100%;
        }
        .company-header {
            text-align: center;
            margin-bottom: 20px;
            page-break-after: avoid;
        }
        .company-name {
            font-size: 20px;
            font-weight: bold;
            margin: 5px 0;
        }
        .company-address {
            font-size: 11px;
            margin: 0;
        }
        .period-title {
            text-align: center;
            background: #f0f0f0;
            padding: 20px;
            margin-bottom: 30px;
            border: 3px solid #000;
            font-size: 18px;
            font-weight: bold;
        }
        .main-header {
            text-align: center;
            border-bottom: 3px solid #000;
            padding: 30px 20px;
            margin-bottom: 40px;
            page-break-after: avoid;
        }
        h1 { 
            font-size: 28px; 
            margin: 0 0 20px 0;
            font-weight: bold;
        }
        .summary-table {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            border-collapse: collapse;
            border: 2px solid #000;
        }
        .summary-table th, .summary-table td {
            border: 2px solid #000;
            padding: 15px 12px;
            text-align: left;
            font-size: 13px;
        }
        .summary-table th {
            background: #f9f9f9;
            font-weight: bold;
            width: 50%;
            font-size: 14px;
        }
        .summary-table .amount {
            text-align: right;
            font-weight: bold;
            font-size: 14px;
        }
        .summary-total {
            background: #e6f3ff !important;
            font-size: 16px !important;
            border-top: 3px solid #000 !important;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 30px 0;
        }
        .stat-card {
            border: 2px solid #000;
            padding: 20px;
            text-align: center;
            background: #fafafa;
        }
        .stat-number {
            font-size: 24px;
            font-weight: bold;
            color: #0066cc;
        }
        .stat-label {
            font-size: 12px;
            margin-top: 5px;
            text-transform: uppercase;
        }
        .footer { 
            margin-top: 60px; 
            text-align: center; 
            font-size: 11px; 
            border-top: 2px solid #000; 
            padding-top: 25px;
            page-break-before: always;
        }
        @media print {
            .stats-grid { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
        }
    </style>
</head>
<body>
    {{-- En-tête entreprise --}}
    <div class="company-header">
        <div class="company-name">VOTRE ENTREPRISE AVIATION</div>
        <div class="company-address">123 Avenue de l'Aviation, Kinshasa, RDC<br>Tél: +243 XXX XXX XXX | Email: contact@votreentreprise.cd</div>
    </div>

    {{-- Période sélectionnée --}}
    <div class="period-title">
        RÉSUMÉ {{ $periodTitle ?? 'Période sélectionnée' }}
    </div>

    <div class="main-header">
        <h1>RAPPORT DE SYNTHÈSE</h1>
    </div>

    {{-- Cartes statistiques --}}
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-number">{{ number_format($totalTrips ?? 0, 0) }}</div>
            <div class="stat-label">Total Voyages</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">{{ number_format($totalPassengers ?? 0, 0) }}</div>
            <div class="stat-label">Total Passagers</div>
        </div>
    </div>

    {{-- Tableau récapitulatif des sommes --}}
    <table class="summary-table">
        <thead>
            <tr>
                <th>INDICATEUR</th>
                <th class="amount">TOTAL</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Revenus Passagers</th>
                <td class="amount">{{ number_format($totalPassengerRevenue ?? 0, 0) }} $</td>
            </tr>
            <tr>
                <th>ACMI</th>
                <td class="amount">{{ number_format($totalAcmis ?? 0, 0) }} $</td>
            </tr>
            <tr>
                <th>Taxes</th>
                <td class="amount">{{ number_format($totalTaxes ?? 0, 0) }} $</td>
            </tr>
            <tr>
                <th>Carburant</th>
                <td class="amount">{{ number_format($totalFuelCost ?? 0, 0) }} $</td>
            </tr>
            <tr>
                <th>Affrètements</th>
                <td class="amount">{{ number_format($totalAffretements ?? 0, 0) }} $</td>
            </tr>
            <tr>
                <th>Dépenses Diverses</th>
                <td class="amount">{{ number_format($totalExpenses ?? 0, 0) }} $</td>
            </tr>
            <tr class="summary-total">
                <th>BÉNÉFICE NET TOTAL</th>
                <td class="amount">{{ number_format($totalProfit ?? 0, 0) }} $</td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        Généré le {{ now()->format('d/m/Y') }}
    </div>
</body>
</html>
