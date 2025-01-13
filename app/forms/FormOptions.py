from ..models import Workout, Exercise

MUSCLE_GROUP = [('Arms'),('Shoulders'),('Chest'),('Abdominals'),('Butt/Legs'),('Cardio')]

SETS = [(str(i), str(i)) for i in range(1,10)]

REPS = [(str(i), str(i)) for i in range(1, 30)]


TIME = [('30 SECONDS'),('45 SECONDS'),('60 SECONDS'),('2 MINUTES'),('5 MINUTES'), ('10 MINUTES'),('15 MINUTES'),('20 MINUTES'),('25 MINUTES'),('30 MINUTES')]

EXERCISE_TYPES = [('Abdominal Exercises'),('Agility Drills'),('CrossFit'),('High-Intensity Interval Training (HIIT)'),('Stretching'),('Cardio'),('Strength Training'),('Weightlifting'),('Bodyweight'),('Other')]

def WORKOUTS():
    workouts = Workout.query.all()
    return [(workout.id, workout.title) for workout in workouts]


def EXERCISES():
    exercises = Exercise.query.all()
    return [(Exercise.id, Exercise.name) for exercise in exercises]