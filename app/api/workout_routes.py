from flask import Blueprint, request, jsonify
from ..models import db, Workout, Exercise
from ..forms import WorkoutForm
from flask_login import login_required, current_user


workout_routes = Blueprint('workout', __name__)


# create workout 
@workout_routes.route('/new', methods=['POST'])
#@login_required
def create_workout():
    data = request.get_json()

    
    title = data.get('title')
    description = data.get('description')
    exercise_type = data.get('exercise_type')
    exercise_ids = data.get('exercises')

    if not title or not description or not exercise_type or not exercise_ids:
        return jsonify({'error': 'Missing required fields'}), 400

    # Ensure valid exercises exist
    exercises = Exercise.query.filter(Exercise.id.in_(exercise_ids)).all()
    if len(exercises) != len(exercise_ids):
        return jsonify({'error': 'Invalid exercise IDs'}), 400

    # Create workout instance
    workout = Workout(
        userid=current_user.id,
        title=title,
        description=description,
        exercise_type=exercise_type,
        exercises=exercises
    )
    db.session.add(workout)
    db.session.commit()

    return jsonify({'message': 'Workout created successfully'}), 201


    
   

# Get a single workout by ID
@workout_routes.route('/<int:workoutid>', methods=['GET'])
#@login_required
def get_workout(workoutid):
    workout = Workout.query.get(workoutid)
    if workout:
        return jsonify({"workouts": workout.to_dict()}), 200
    else:
        return jsonify({"error": "Workout not found"}), 404


# Get all workouts
@workout_routes.route('/', methods=['GET'])
##@login_required
def get_all_workouts():
    workouts = Workout.query.all()
    return jsonify({"workouts": [workout.to_dict() for workout in workouts]}), 200


# Update a workout 
@workout_routes.route('update/<int:workoutid>', methods=['PUT'])
@login_required
def update_workout(workoutid):
    workout = Workout.query.get_or_404(workoutid)

    # Update the workout details
    data = request.get_json()
    workout.title = data.get('title', workout.title)
    workout.description = data.get('description', workout.description)
    workout.exercise_type = data.get('exercise_type', workout.exercise_type)

    # Get the exercises and ensure they are valid
    exercise_ids = data.get('exercises')
    exercises = Exercise.query.filter(Exercise.id.in_(exercise_ids)).all()
    if len(exercises) != len(exercise_ids):
        return jsonify({'error': 'Invalid exercise IDs'}), 400

    workout.exercises = exercises

    # Commit the changes to the database
    db.session.commit()

    return jsonify({'message': 'Workout updated successfully'}), 200



# Delete a workout by ID
@workout_routes.route('/delete/<int:workoutid>', methods=['DELETE'])
@login_required
def delete_workout(workoutid):
    workout = Workout.query.get(workoutid)

    if not workout:
        return jsonify({'message': 'Workout not found'}), 404

    if workout.userid != current_user.id:
        return jsonify({'message': 'Unauthorized: Deletion can\'t be completed'}), 403

    db.session.delete(workout)
    db.session.commit()
    return jsonify({'message': 'Workout deleted successfully'}), 200


#Get workout by user
@workout_routes.route('/user')
@login_required
def workout_by_user():
    workouts = Workout.query.filter(Workout.userid == current_user.id).all()

    if workouts:
         return jsonify({'workouts': [workout.to_dict() for workout in workouts]})
    else:
        return jsonify({'message': 'No workouts found for this user.'}), 404
