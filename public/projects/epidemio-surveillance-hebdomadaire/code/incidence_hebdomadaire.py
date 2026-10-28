"""
Incidence hebdomadaire et détection de signaux d'alerte (DONNÉES SYNTHÉTIQUES).

Entrée  : ../data/surveillance_synthetique.csv  (week, zone, population, cases, tested)
Sortie  : tableau récapitulatif par zone + semaines en alerte (affichés et exportés en CSV)

Usage   : python incidence_hebdomadaire.py
Requis  : pandas
"""
from pathlib import Path

import pandas as pd

DATA = Path(__file__).resolve().parent.parent / "data" / "surveillance_synthetique.csv"
OUT = Path(__file__).resolve().parent / "alertes_par_zone.csv"

df = pd.read_csv(DATA)

# 1. Qualité des données : les semaines non rapportées (NaN) sont conservées, jamais remplacées par 0.
missing_weeks = df["cases"].isna().sum()
print(f"Semaines non rapportées : {missing_weeks} / {len(df)} ({missing_weeks / len(df):.1%})")

# 2. Indicateurs
df["incidence_per_10k"] = df["cases"] / df["population"] * 10_000
df["positivity"] = df["cases"] / df["tested"]
df = df.sort_values(["zone", "week"])
# Moyenne mobile sur 4 semaines (min. 2 observations pour tolérer les trous)
df["incidence_ma4"] = df.groupby("zone")["incidence_per_10k"].transform(lambda s: s.rolling(4, min_periods=2).mean())

# 3. Seuil d'alerte par zone : moyenne + 2 écarts-types de l'incidence de la zone
stats = df.groupby("zone")["incidence_per_10k"].agg(["mean", "std"])
df = df.join(stats, on="zone")
df["threshold"] = df["mean"] + 2 * df["std"]
df["alert"] = df["incidence_per_10k"] > df["threshold"]

summary = (
    df.groupby("zone")
    .agg(
        total_cases=("cases", "sum"),
        mean_incidence_per_10k=("incidence_per_10k", "mean"),
        peak_incidence_per_10k=("incidence_per_10k", "max"),
        alert_weeks=("alert", "sum"),
    )
    .round(2)
)
print(summary)

df.loc[df["alert"], ["zone", "week", "cases", "incidence_per_10k", "threshold"]].round(2).to_csv(OUT, index=False)
print(f"Alertes exportées dans {OUT.name}")
