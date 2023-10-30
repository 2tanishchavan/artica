from dotenv import load_dotenv
import os
from supabase import create_client, Client

load_dotenv()

url: str = os.environ.get("SUPABASE_PROJECT_URL")
key: str = os.environ.get("SUPABASE_PROJECT_API_KEY")

supabase: Client = create_client(url, key)


def get_user_by_id(user_id: str) -> dict:
    response = supabase.table("users").select("*").eq("id", user_id).execute()
    return response.data[0]

def get_user_full_name_by_id(user_id: str) -> str:
    user = supabase.table("users").select("full_name").eq("id", user_id).execute()
    user_full_name = user.data[0]["full_name"]
    return user_full_name


def get_posts() -> list:
    posts = (
        supabase.table("posts")
        .select("id, title, description, category, tags, user_id")
        .execute()
    )
    return posts.data


def get_post_by_id(post_id: str) -> dict:
    post = supabase.table("posts").select("*").eq("id", post_id).execute()
    return post.data[0]


def get_post_title_by_id(post_id: str) -> str:
    post = supabase.table("posts").select("title").eq("id", post_id).execute()
    post_title = post.data[0]["title"]
    return post_title

def get_liked_posts_by_user_id(user_id: str) -> list:
    response = supabase.table("liked_posts").select("post_id").eq("user_id", user_id).execute()
    return response.data