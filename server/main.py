from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase_db import get_user_full_name_by_id, get_posts, get_post_title_by_id
from recommendation import get_similar_posts_recommendations

app = FastAPI()

origins = ["http://localhost:3000", "https://articaa.netlify.app"]

app.add_middleware(
    CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"]
)


@app.get("/api/v1/test")
def index():
    return {"message": "Connection Successfull!"}


@app.post("/api/v1/recommendations")
def recommendations(request: dict):
    posts = get_posts()

    posts_dataset = []
    for post in posts:
        post["user_id"] = get_user_full_name_by_id(post["user_id"])
        posts_dataset.append(post)

    post_id: str = request["id"]
    post_title = get_post_title_by_id(post_id)

    posts_ids = get_similar_posts_recommendations(posts_dataset, post_title)

    return {"status": "ok", "response": posts_ids}
