# fmt: off
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from backend.application.settings import BackendSettings

backend_application = Flask(
    import_name=__name__,
    static_url_path="/static/",
    static_folder=f"{BackendSettings.BASE_DIR}/static",
    template_folder=f"{BackendSettings.BASE_DIR}/frontend"
)
backend_application.config.from_object(BackendSettings)
db = SQLAlchemy(backend_application)

from backend import models  # noqa
from backend import routes  # noqa
# fmt: on
