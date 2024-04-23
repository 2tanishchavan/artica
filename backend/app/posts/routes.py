from flask import jsonify, request
from app.extensions import db
from app.posts import bp
from app.models.post import Post

@bp.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        post_data = request.json

        new_post = Post(
            title=post_data.get('title'),
            description=post_data.get('description'),
            category=post_data.get('category'),
            tags=post_data.get('tags'),
            images=post_data.get('images'),
            user_id=post_data.get('user_id')
        )

        db.session.add(new_post)
        db.session.commit()

        return jsonify({ "status": "OK", "code": 201, "data": new_post.serialize() })

    posts = Post.query.all()
    posts_data = [
        {
            "id": post.id,
            "title": post.title,
            "description": post.description,
            "category": post.category,
            "tags": post.tags,
            "images": post.images,
            "user_id": post.user_id,
            "created_at": post.created_at
        }
        for post in posts
    ]
    return jsonify({ "status": "OK", "code": 200, "data": posts_data })