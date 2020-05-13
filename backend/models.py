import datetime

from backend.application import db


class CovidByCountyRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    county = db.Column(db.String(120), nullable=False)
    cases_confirmed = db.Column(db.Integer, nullable=True)
    date = db.Column(db.Date, nullable=False)

    __table_name__ = "covid_by_county_record"
    __table_args__ = (db.UniqueConstraint("county", "date", name="county_date_uc"),)


class RiskIndexRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    zip_code = db.Column(db.String(32), nullable=False)
    risk_index = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String(64), nullable=False)
    county = db.Column(db.String(64), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    long = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.date.today, nullable=False)

    __table_name__ = "risk_index_record"
    __table_args__ = (
        db.UniqueConstraint(
            "created_at", "zip_code", name="risk_index_county_created_at_uc"
        ),
    )
