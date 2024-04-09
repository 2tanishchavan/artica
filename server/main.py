from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase_db import get_user_full_name_by_id, get_posts, get_post_title_by_id
from recommendation import get_similar_posts_recommendations, get_liked_posts_recommendations

app = FastAPI()

origins = ["http://localhost:3000", "https://articaa.netlify.app"]

app.add_middleware(
    CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"]
)


@app.get("/api/v1/test")
def index():
    return {"message": "Connection Successfull!"}


# @app.post("/api/v1/suggestions")
# async def suggestions(request: dict):
#     posts = get_posts()

#     posts_dataset = []
#     for post in posts:
#         post["user_id"] = get_user_full_name_by_id(post["user_id"])
#         post["tag"] = None
#         posts_dataset.append(post)

#     post_id: str = request["id"]
#     post_title = get_post_title_by_id(post_id)

#     posts = get_similar_posts_recommendations(posts_dataset, post_title)

#     return {"status": "ok", "posts": posts}

@app.post("/api/v1/recommendations")
async def recommendations(request: dict):
    posts = get_posts()

    posts_dataset = []
    for post in posts:
        post["user_id"] = get_user_full_name_by_id(post["user_id"])
        post["tag"] = None
        posts_dataset.append(post)

    user_id: str = request["id"]

    posts = get_liked_posts_recommendations(posts_dataset, user_id)

    return {"status": "ok", "posts": posts}