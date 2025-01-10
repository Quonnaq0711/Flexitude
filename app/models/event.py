from .user import User
from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_sqlalchemy import SQLAlchemy

class Event(db.Model):
    __tablename__ = 'events'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)
    title = db.Column(db.String, nullable=False)
    startdate = db.Column(db.TIMESTAMP, nullable=False)
    enddate = db.Column(db.TIMESTAMP, nullable=False)
    description = db.Column(db.Text, nullable=False)

    user = db.relationship('User', backref='events')
    comments = db.relationship('Comment', backref='event', lazy=True)  # Fix backref to 'event'

    def to_dict(self):
        return {
            'id': self.id,
            'userid': self.userid,
            'title': self.title,
            'startdate': self.startdate.strftime('%m-%d-%y') if self.startdate else None, 
            'enddate': self.enddate.strftime('%m-%d-%y') if self.enddate else None, 
            'description': self.description,
            'username': self.user.username if self.user else None,
            'comments': [comment.comment for comment in self.comments],  # Access all comments
        }



