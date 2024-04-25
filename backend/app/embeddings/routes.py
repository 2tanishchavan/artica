from flask import request, jsonify
from app.extensions import db
from app.embeddings import bp
from app.models.post import Post
from app.utils.supabaseClient import supabase
from app.embeddings.text_to_embedding import text_to_embedding

@bp.route("/<post_id>", methods=["PUT"])
def create_and_insert_embedding_in_db(post_id):
    post = Post.query.get(post_id)
    text_metadata = f"{post.title} {post.description} {post.category} {' '.join(post.tags)}"
    embedding = text_to_embedding(text_metadata)

    data, count = supabase.table("posts").\
        update({"embedding": embedding}).\
        eq("id", post_id).\
        execute()

    return jsonify({ "status": "OK", "code": 200 })