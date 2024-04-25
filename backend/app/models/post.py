from app.extensions import db
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy import func

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=func.gen_random_uuid())
    title = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String, nullable=False)

    tags = db.Column(ARRAY(db.Text), nullable=False)
    images = db.Column(ARRAY(db.Text), nullable=False)

    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id', ondelete='CASCADE'))
    created_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False, default=func.now())
    user = db.relationship('User', backref='posts')

    def serialize(self):
        return {
            'id': str(self.id),
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'tags': self.tags,
            'images': self.images,
            'user_id': str(self.user_id),
            'created_at': self.created_at.isoformat()
        }

    def __repr__(self):
        return f'<Post {self.id}>'