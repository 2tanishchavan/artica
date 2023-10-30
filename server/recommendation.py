from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from supabase_db import (
    get_post_by_id,
    get_post_title_by_id,
    get_user_by_id,
    get_liked_posts_by_user_id,
)
import pandas as pd


def get_similar_posts_recommendations(dataset: list, post_title: str) -> list:
    # Dataset loading & creating new dataset for finding similarity
    df = pd.DataFrame(dataset)
    for i in range(len(df)):
        df.loc[i][
            "tag"
        ] = f"{df.loc[i]['description']} {df.loc[i]['category']} {' '.join(df.loc[i]['tags'])} {df.loc[i]['user_id']}"
    new_df = df.drop(columns=["description", "category", "tags", "user_id"])

    # Vectorization Process
    cv = CountVectorizer(max_features=5000, stop_words="english")
    vector = cv.fit_transform(new_df["tag"]).toarray()

    # Finding cosine similarities between vectors of tags
    similarity = cosine_similarity(vector)
    index = new_df[new_df["title"] == post_title].index[0]
    distances = sorted(
        list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1]
    )

    # Create a list of post id inorder to fetch posts from frontend
    posts = []
    for i in distances[1:6]:
        post = get_post_by_id(new_df.iloc[i[0]].id)
        post["user"] = get_user_by_id(post["user_id"])
        del post["user_id"]
        posts.append(post)

    return posts


def get_liked_posts_recommendations(dataset: list, user_id: str) -> list:
    # Dataset loading & creating new dataset for finding similarity
    df = pd.DataFrame(dataset)
    for i in range(len(df)):
        df.loc[i][
            "tag"
        ] = f"{df.loc[i]['description']} {df.loc[i]['category']} {' '.join(df.loc[i]['tags'])} {df.loc[i]['user_id']}"

    new_df = df.drop(columns=["description", "category", "tags", "user_id"])

    liked_posts = get_liked_posts_by_user_id(user_id)
    recommended_posts_ids: list = []

    # Vectorization Process
    cv = CountVectorizer(max_features=5000, stop_words="english")
    vector = cv.fit_transform(new_df["tag"]).toarray()

    # Finding cosine similarities between vectors of tags
    similarity = cosine_similarity(vector)

    for i in range(len(liked_posts)):
        post_title = get_post_title_by_id(liked_posts[i]["post_id"])
        index = new_df[new_df["title"] == post_title].index[0]
        distances = sorted(
            list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1]
        )

        # Create a list of post id inorder to fetch posts from frontend
        for i in distances[1:6]:
            recommended_posts_ids.append(new_df.iloc[i[0]].id)

    recommended_posts_ids: list = list(set(recommended_posts_ids))

    recommended_posts: list = []

    for i in range(len(recommended_posts_ids)):
        post = get_post_by_id(recommended_posts_ids[i])
        post["user"] = get_user_by_id(post["user_id"])
        del post["user_id"]
        recommended_posts.append(post)

    return recommended_posts
