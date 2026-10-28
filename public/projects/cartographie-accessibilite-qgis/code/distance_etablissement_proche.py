"""
Distance de chaque village à l'établissement de santé le plus proche (DONNÉES FICTIVES).

Équivalent « script » du traitement QGIS « Distance au plus proche » : utile pour
vérifier les résultats de la carte ou automatiser l'analyse.
Entrées : ../data/villages_fictifs.csv, ../data/etablissements_fictifs.csv (coordonnées WGS84)
Usage   : python distance_etablissement_proche.py     Requis : pandas
"""
from math import asin, cos, radians, sin, sqrt
from pathlib import Path

import pandas as pd

DATA = Path(__file__).resolve().parent.parent / "data"
villages = pd.read_csv(DATA / "villages_fictifs.csv")
facilities = pd.read_csv(DATA / "etablissements_fictifs.csv")


def haversine_km(lat1, lon1, lat2, lon2):
    """Distance à vol d'oiseau (km) sur la sphère terrestre."""
    p1, p2 = radians(lat1), radians(lat2)
    a = sin((p2 - p1) / 2) ** 2 + cos(p1) * cos(p2) * sin(radians(lon2 - lon1) / 2) ** 2
    return 2 * 6371.0088 * asin(sqrt(a))


def nearest(row):
    dists = facilities.apply(lambda f: haversine_km(row.lat, row.lon, f.lat, f.lon), axis=1)
    i = dists.idxmin()
    return pd.Series({"nearest_facility": facilities.loc[i, "facility_id"], "distance_km": round(dists[i], 2)})


villages = villages.join(villages.apply(nearest, axis=1))
within_5km = villages.loc[villages["distance_km"] <= 5, "population"].sum() / villages["population"].sum()

print(villages.sort_values("distance_km", ascending=False).head(10).to_string(index=False))
print(f"\nPopulation à moins de 5 km à vol d'oiseau : {within_5km:.1%}")
villages.to_csv(Path(__file__).resolve().parent / "villages_avec_distance.csv", index=False)
