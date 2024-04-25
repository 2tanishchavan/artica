from flask import Flask
from flask_cors import CORS
from config import config_by_name
from app.extensions import db, flask_bcrypt
import os
from dotenv import load_dotenv
load_dotenv()

env = os.getenv("ENVIRONMENT")

def create_app(config_name=env):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    # Initialize Flask extensions here
    CORS(app, origins='*')

    db.init_app(app)
    flask_bcrypt.init_app(app)

    # Register blueprints here
    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    from app.posts import bp as posts_bp
    app.register_blueprint(posts_bp, url_prefix="/posts")

    from app.users import bp as users_bp
    app.register_blueprint(users_bp, url_prefix="/users")

    from app.recommendations import bp as recommendations_bp
    app.register_blueprint(recommendations_bp, url_prefix="/recommendations")

    from app.embeddings import bp as embeddings_bp
    app.register_blueprint(embeddings_bp, url_prefix="/embeddings")

    @app.route('/api/test')
    def test_page():
        return '<h1>Testing the Flask Application Factory Pattern</h1>'

    return app