from .db import db, environment, SCHEMA


WorkoutExercise = db.Table(
    'workout_exercise',
    db.Column("workouts_id", db.Integer, db.ForeignKey(f"{SCHEMA}.workouts.id" if environment == "production" else "workouts.id")),
    db.Column("exercises_id", db.Integer, db.ForeignKey(f"{SCHEMA}.exercises.id" if environment =="production" else "exercises.id"))
)
if environment == 'production':
    WorkoutExercise.schema = SCHEMA

# class WorkoutExercise(db.Model):
#     __tablename__ = 'workout_exercises'

#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)  
#     workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'), nullable=False)
#     exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'workout_id': self.workout_id,
#             'exercise_id': self.exercise_id
#         }




