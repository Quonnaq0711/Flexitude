from app.models import SCHEMA, db, Workout, Exercise, environment
from sqlalchemy.sql import text

def seed_workouts():
    workouts1 = Workout(
        userid=1,
        title='Morning Strength Routine',
        description='A full-body workout focusing on strength and endurance.',
        exercise_type='Strength',
        exercises=[Exercise.query.get(id) for id in [1, 2, 3]]  # Assuming Exercise IDs 1, 2, and 3 exist
    )

    workouts2 = Workout(
        userid=2,
        title='Leg Day Routine',
        description='A focused workout for legs with squats and lunges.',
        exercise_type='Strength',
        exercises=[Exercise.query.get(id) for id in [2, 5]]  # Assuming Exercise IDs 2 and 5 exist
    )

    workouts3 = Workout(
        userid=3,
        title='Core Strengthening',
        description='An intense workout for strengthening the core with planks and other exercises.',
        exercise_type='Core',
        exercises=[Exercise.query.get(id) for id in [3, 6]]  # Assuming Exercise IDs 3 and 6 exist
    )

    workouts4 = Workout(
        userid=4,
        title='Back Power Workout',
        description='A workout designed to build strength in the back using deadlifts and pull-ups.',
        exercise_type='Strength',
        exercises=[Exercise.query.get(id) for id in [4, 6]]  # Assuming Exercise IDs 4 and 6 exist
    )


    db.session.add(workouts4)
    db.session.add(workouts1)
    db.session.add(workouts2)
    db.session.add(workouts3)
    db.session.commit()


def undo_workouts():
    if environment == "Production":
        db.session.execute(f'TRUNCATE table {SCHEMA}.workouts RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text("DELETE FROM workouts"))
    db.session.commit() 
