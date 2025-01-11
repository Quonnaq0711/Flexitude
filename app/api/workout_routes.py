from flask import Blueprint, request, jsonify
from app.models import db, Workout, Exercise
from sqlalchemy.exc import SQLAlchemyError

workout_routes = Blueprint('workouts', __name__)

@workout_routes.route('/create_workout', methods=['GET', 'POST'])
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
        return jsonify(workout.to_dict()), 201
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Get a single workout by ID
@workout_routes.route('/<int:id>', methods=['GET'])
def get_workout(id):
    workout = Workout.query.get(id)
    if workout:
        return jsonify(workout.to_dict()), 200
    else:
        return jsonify({"error": "Workout not found"}), 404


# Get all workouts
@workout_routes.route('/', methods=['GET'])
def get_all_workouts():
    workouts = Workout.query.all()
    return jsonify([workout.to_dict() for workout in workouts]), 200


# Update a workout by ID
@workout_routes.route('/<int:id>', methods=['PUT'])
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
    return jsonify(workout.to_dict()), 200


# Delete a workout by ID
@workout_routes.route('/<int:id>', methods=['DELETE'])
def delete_workout(id):
    workout = Workout.query.get(id)
    
    if not workout:
        return jsonify({"error": "Workout not found"}), 404
    
    db.session.delete(workout)
    db.session.commit()
    
    return jsonify({"message": "Workout deleted successfully"}), 200
