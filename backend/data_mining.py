import datetime
import io
import zipfile

import pandas as pd
import requests

from backend import models
from backend.application import db
from backend.application.settings import BackendSettings

URL = "https://www.mass.gov/doc/covid-19-raw-data-may-10-2020/download"
RISK_INDEX_DIR = f"{BackendSettings.STATIC_DIR}/risk_index.json"


def update_county_wise_cases():
    r = requests.get(URL)
    zip_file = zipfile.ZipFile(io.BytesIO(r.content))

    with zip_file.open("County.csv") as f:
        data_frame = pd.read_csv(f)
        data_frame.rename(
            columns={"County": "county", "Date": "date", "Count": "cases_confirmed"},
            inplace=True,
        )
        data_frame["date"] = pd.to_datetime(
            data_frame["date"], infer_datetime_format=True
        ).dt.date
        data_frame = data_frame[data_frame["cases_confirmed"] > 0]
        data_frame[["county", "date", "cases_confirmed"]].to_sql(
            name=models.CovidByCountyRecord.__table_name__,
            con=db.engine,
            index=False,
            if_exists="append",
        )


def update_risk_index_records():
    data_frame = pd.read_json(RISK_INDEX_DIR)
    data_frame["created_at"] = datetime.date.today()
    data_frame[
        ["county", "zip_code", "risk_index", "city", "created_at", "lat", "long"]
    ].to_sql(
        name=models.RiskIndexRecord.__table_name__,
        con=db.engine,
        index=False,
        if_exists="append",
    )
