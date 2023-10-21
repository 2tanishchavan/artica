from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd


def get_similar_posts_recommendations(dataset: list, post_title: str) -> list:
    # Dataset loading & creating new dataset for finding similarity
    df = pd.DataFrame(dataset)
    df["tags"] = df["category"] + " " + df["user_id"]
    new_df = df.drop(columns=["category", "user_id"])

    # Vectorization Process
    cv = CountVectorizer(max_features=5000, stop_words="english")
    vector = cv.fit_transform(new_df["tags"]).toarray()

    # Finding cosine similarities between vectors of tags
    similarity = cosine_similarity(vector)
    index = new_df[new_df["title"] == post_title].index[0]
    distances = sorted(
        list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1]
    )

    # Create a list of post id inorder to fetch posts from frontend
    posts_ids = []
    for i in distances[1:7]:
        posts_ids.append(new_df.iloc[i[0]].id)

    return posts_ids
