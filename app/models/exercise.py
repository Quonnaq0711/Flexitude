from .user import User
from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_sqlalchemy import SQLAlchemy

class Exercise(db.Model):
    __tablename__ = 'exercises'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)
    name = db.Column(db.String, nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    musclegroup = db.Column(db.String, nullable=False)
    equipment = db.Column(db.String, nullable=False)
    sets = db.Column(db.String, nullable=True)
    reps = db.Column(db.String, nullable=True)
    time = db.Column(db.String, nullable=True)

    user = db.relationship('User', backref='exercises')

    def to_dict(self):
        return {
            'id': self.id,
            'userid': self.user.id,
            'name': self.name,
            'instructions': self.instructions,
            'musclegroup': self.musclegroup,
            'equipment': self.equipment,
            'sets': self.sets,
            'reps': self.reps,
            'time': self.time,
        }


