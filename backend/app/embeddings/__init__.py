from flask import Blueprint

bp = Blueprint("embeddings", __name__)

from app.embeddings import routes