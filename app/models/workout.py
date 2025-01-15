from .user import User
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .workout_exercise import WorkoutExercise
from flask_sqlalchemy import SQLAlchemy

# In the Workout model
class Workout(db.Model):
    __tablename__ = 'workouts'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)  
    exercise_type = db.Column(db.String, nullable=False)  

    # Relationship to the Exercise model through the association table
    exercises = db.relationship('Exercise', secondary=WorkoutExercise, backref=db.backref('workouts', lazy='dynamic'))
    user = db.relationship('User', backref='workouts')

    def to_dict(self):
        return {
            'id': self.id,
            'userid': self.userid,
            'title': self.title,
            'description': self.description, 
            'exercise_type': self.exercise_type,
            'username': self.user.username if self.user else None,
            'exercises': [
                {
                    'id': exercise.id,
                    'name': exercise.name,
                    'instructions': exercise.instructions,
                    'musclegroup': exercise.musclegroup,
                    'equipment': exercise.equipment,
                    'sets': exercise.sets,
                    'reps': exercise.reps
                }
                for exercise in self.exercises
            ] if self.exercises else None
        }


# class WorkoutExercise(db.Model):
#     __tablename__ = 'workout_exercises'

#     workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'), primary_key=True)
#     exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), primary_key=True)

#     def to_dict(self):
#         return {
#             'workout_id': self.workout_id,
#             'exercise_id': self.exercise_id
#         }




