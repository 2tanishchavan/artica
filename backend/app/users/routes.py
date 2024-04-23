from flask import jsonify
from app.users import bp
from app.models.user import User

@bp.route("/", methods=["GET"])
def index():
    users = User.query.all()
    user_data = [
        {
            'id': user.id,
            'full_name': user.full_name,
            'username': user.username,
            'email': user.email,
            'avatar_url': user.avatar_url,
            'bio': user.bio,
            'location': user.location,
            'updated_at': user.updated_at,
            'created_at': user.created_at
        }
        for user in users
    ]
    return jsonify(user_data)