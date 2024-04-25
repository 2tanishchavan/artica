from flask import jsonify, request
from app.recommendations import bp
from app.utils.supabaseClient import supabase
from sklearn.metrics.pairwise import cosine_similarity

@bp.route("/", methods=["PUT"])
def index():
    data = request.json
    liked_posts = data.get("liked_posts")
    all_posts = data.get("all_posts")

    return jsonify(liked_posts, all_posts)
