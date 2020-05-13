import json
from datetime import date, timedelta

import graphene
from flask import Response, send_from_directory
from flask_graphql import GraphQLView
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType

from backend.application import backend_application
from backend.application.settings import BackendSettings
from backend.models import CovidByCountyRecord, RiskIndexRecord


class CountyWiseRecordObject(SQLAlchemyObjectType):
    class Meta:
        model = CovidByCountyRecord
        interfaces = (graphene.relay.Node,)


class RiskIndexRecordObject(SQLAlchemyObjectType):
    class Meta:
        model = RiskIndexRecord
        interfaces = (graphene.relay.Node,)


# def get_yesterday():
#     today = date.today()
#     return today - timedelta(days=2)


class Query(graphene.ObjectType):
    node = graphene.relay.Node.Field()
    county_wise_current_records = graphene.List(CountyWiseRecordObject)
    risk_index_records = graphene.List(RiskIndexRecordObject)

    @staticmethod
    def resolve_county_wise_current_records(*args):
        return (
            CovidByCountyRecord.query.order_by(CovidByCountyRecord.date.desc())
            .limit(15)
            .all()
        )

    @staticmethod
    def resolve_risk_index_records(*args):
        return (
            RiskIndexRecord.query.order_by(
                RiskIndexRecord.created_at.desc(), RiskIndexRecord.risk_index.desc()
            )
            # .limit(537)
            .all()
        )


schema = graphene.Schema(query=Query)

backend_application.add_url_rule(
    "/graphql-api",
    view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True),
)


# @backend_application.route("/detailed-countries", methods=["GET"])
# def detailed_countries():
#     return Response(json.dumps([country.casefold() for country in DETAILED_COUNTRIES]))


@backend_application.route("/<path:filename>", methods=["GET"])
def dev_frontend_test(filename):
    return send_from_directory(
        directory=f"{BackendSettings.BASE_DIR}/frontend", filename=filename
    )
