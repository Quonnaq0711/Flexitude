from ..models import Workout, Exercise

MUSCLE_GROUP = [('Arms'),('Shoulders'),('Chest'),('Abs'),('Butt'),('Cardio'),('Legs'),('Agility Drills'),('CrossFit'),('HIIT'),('Stretching'),('Cardio'),('Strength Training'),('Weightlifting'),('Bodyweight'),('Other')]

SETS = [(str(i), str(i)) for i in range(1,10)]

REPS = [(str(i)) for i in range(1, 30)]


TIME = [('30 SECONDS'),('45 SECONDS'),('60 SECONDS'),('2 MINUTES'),('5 MINUTES'), ('10 MINUTES'),('15 MINUTES'),('20 MINUTES'),('25 MINUTES'),('30 MINUTES')]

EXERCISE_TYPES = [('Arms'),('Shoulders'),('Chest'),('Abs'),('Butt'),('Cardio'),('Legs'),('Agility Drills'),('CrossFit'),('HIIT'),('Stretching'),('Cardio'),('Strength Training'),('Weightlifting'),('Bodyweight'),('Other')]

def WORKOUTS():
    workouts = Workout.query.all()
    return [(workout.id, workout.title) for workout in workouts]


def EXERCISES():
    exercises = Exercise.query.all()
    return [(exercise.id, exercise.name) for exercise in exercises]