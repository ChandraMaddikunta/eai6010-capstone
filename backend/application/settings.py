from backend.application.config import BACKEND_CONFIGS as B_CONF
from backend.application.config import BASE_DIR, ROOT_DIR


class BackendSettings:
    # Main paths:
    BASE_DIR = BASE_DIR
    DATA_DIR = f"{BASE_DIR}/data_analysis/project_data"
    STATIC_DIR = f"{BASE_DIR}/static"
    # Main application settings:
    SECRET_KEY = B_CONF["SECRET_KEY"]
    # DATABASE:
    DB_NAME = B_CONF["DB_NAME"]
    DB_USER = B_CONF["DB_USER"]
    DB_PASSWORD = B_CONF["DB_PASSWORD"]
    DB_HOST = B_CONF["DB_HOST"]
    DB_PORT = B_CONF["DB_PORT"]
    SQLALCHEMY_DATABASE_URI = (
        f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = True
