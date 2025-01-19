from flask import Blueprint, request, jsonify
from ..models import db, Workout, Exercise
from ..forms import WorkoutForm
from flask_login import login_required, current_user


workout_routes = Blueprint('workout', __name__)


#Create workout
@workout_routes.route('/new', methods=['GET', 'POST'])
@login_required
def create_workout():
    form = WorkoutForm()

    if form.validate_on_submit():
        # Process form data here
        title = form.title.data
        description = form.description.data
        exercise_type = form.exercise_type.data
        exercises = form.exercises.data
        
        # Ensure the exercise IDs are valid and match existing exercises
        exercises = Exercise.query.filter(Exercise.id.in_(exercise_ids)).all()
        
        # Ensure the number of exercises matches the given exercise_ids
        if len(exercises) != len(exercise_ids):
            return jsonify({"error": "Invalid exercise IDs"}), 400
        
        # Create a new workout instance
        workout = Workout(
            userid=userid,
            title=title,
            description=description,
            exercise_type=exercise_type,
            exercises=exercises  # Many-to-many relationship
        )

        db.session.add(workout)
        db.session.commit()
        return jsonify({
            'message': 'Workout created successfully',
            'exercise': workout.to_dict()
        }), 201
        
    db.session.rollback()
    return jsonify({
        'message': 'Invalid workout data',
        'errors': form.errors
    }), 400
    
   

# Get a single workout by ID
@workout_routes.route('/<int:workoutid>', methods=['GET'])
@login_required
def get_workout(workoutid):
    workout = Workout.query.get(workoutid)
    if workout:
        return jsonify({"workouts": workout.to_dict()}), 200
    else:
        return jsonify({"error": "Workout not found"}), 404


# Get all workouts
@workout_routes.route('/', methods=['GET'])
@login_required
def get_all_workouts():
    workouts = Workout.query.all()
    return jsonify({"workouts": [workout.to_dict() for workout in workouts]}), 200


# Update a workout by ID
@workout_routes.route('update/<int:id>', methods=['PUT'])
# @login_required
def update_workout(id):
    workout = Workout.query.get(id)
    
    if not workout:
        return jsonify({"error": "Workout not found"}), 404
    
    data = request.get_json()

    # Update fields based on request data
    workout.title = data.get('title', workout.title)
    workout.description = data.get('description', workout.description)
    workout.exercise_type = data.get('exercise_type', workout.exercise_type)

    exercise_ids = data.get('exercise_ids')
    if exercise_ids:
        exercises = Exercise.query.filter(Exercise.id.in_(exercise_ids)).all()
        if len(exercises) == len(exercise_ids):
            workout.exercises = exercises
        else:
            return jsonify({"error": "Invalid exercise IDs"}), 400
    
    db.session.commit()
    return jsonify({"workouts": workout.to_dict()}), 200


# Delete a workout by ID
@workout_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_workout(id):
    workout = Workout.query.get(id)
    
    if not workout:
        return jsonify({"error": "Workout not found"}), 404
    
    db.session.delete(workout)
    db.session.commit()
    
    return jsonify({"message": "Workout deleted successfully"}), 200


#Get workout by user
@workout_routes.route('/user')
@login_required
def workout_by_user():
    workouts = Workout.query.filter(Workout.userid == current_user.id).all()

    if workouts:
         return jsonify({'workouts': [workout.to_dict() for workout in workouts]})
    else:
        return jsonify({'message': 'No workouts found for this user.'}), 404
