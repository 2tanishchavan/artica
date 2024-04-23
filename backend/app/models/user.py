from app.extensions import db
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import func

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=func.auth_uid())
    full_name = db.Column(db.Text, nullable=False)
    username = db.Column(db.Text, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    avatar_url = db.Column(db.Text, nullable=False)
    bio = db.Column(db.Text, nullable=True)
    location = db.Column(db.Text, nullable=True)
    updated_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False, default=func.now())
    created_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False, default=func.now())

    def serialize(self):
        return {
            'id': str(self.id),
            'full_name': self.full_name,
            'username': self.username,
            'email': self.email,
            'avatar_url': self.avatar_url,
            'bio': self.bio,
            'location': self.location,
            'updated_at': self.updated_at.isoformat(),
            'created_at': self.created_at.isoformat()
        }

    def __repr__(self):
        return f'<User {self.id}>'
