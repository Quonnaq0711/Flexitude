from .user import User
from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_sqlalchemy import SQLAlchemy

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('events.id')), nullable=True)  # Foreign key to Event
    exercise_ids = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('exercises.id')), nullable=True)  # Foreign key to Exercise

    user = db.relationship('User', backref='comments')
    # event = db.relationship('Event', backref='comments', lazy=True)  # Relationship with Event
    exercise = db.relationship('Exercise', backref='comments', lazy=True)  # Relationship with Exercise

    def to_dict(self):
        return {
            'id': self.id,
            'userid': self.userid,
            'comment': self.comment,
            'user': self.user.username if self.user else None,
            'event': self.event.title if self.event else None,  # Include event title
            'exercise': self.exercise.name if self.exercise else None,  # Include exercise name
        }


