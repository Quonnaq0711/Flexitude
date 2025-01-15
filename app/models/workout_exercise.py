from .db import db, environment, SCHEMA

# workout_exercise = db.Table(
#     'workout_exercise',
#     db.Column("workout_id", db.Integer, db.ForeignKey(f"{SCHEMA}.workouts.id" if environment == "production" else "workout.id"), primary_key=True),
#     db.Column("exercise_id", db.Integer, db.ForeignKey(f"{SCHEMA}.exercises.id" if environment =="production" else "exercises.id"), primary_key=True)
# )
# if environment == 'production':
#     workout_exercise.schema = SCHEMA

class WorkoutExercise(db.Model):
    __tablename__ = 'workout_exercises'

    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'), primary_key=True)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), primary_key=True)

    def to_dict(self):
        return {
            'workout_id': self.workout_id,
            'exercise_id': self.exercise_id
        }



