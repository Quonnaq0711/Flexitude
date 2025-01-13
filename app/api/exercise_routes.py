from flask import jsonify, Blueprint, request
from ..models import Exercise, db
from ..forms import ExerciseForm
from flask_login import login_required, current_user


exercise_routes = Blueprint('exercise', __name__)


# Get all exercises
@exercise_routes.route('/')
def exercises():
    exercises = Exercise.query.all()
    return jsonify({'exercises': [exercise.to_dict() for exercise in exercises]})


#Get Exercise by Muscle Group
@exercise_routes.route('/<musclegroup>')
# @login_required
def exercise_by_musclegroup(musclegroup):
    
    exercises = Exercise.query.filter_by(musclegroup=musclegroup).all()

    if exercises:
         return jsonify({'exercises': [exercise.to_dict() for exercise in exercises]})
    else:
        return jsonify({'message': 'No exercises found for this muscle group.'}), 404



#Get Exercise by user
@exercise_routes.route('/user')
# @login_required
def exercise_by_user():
    exercises = Exercise.query.filter(Exercise.userid == current_user.id).all()

    if exercises:
         return jsonify({'exercises': [exercise.to_dict() for exercise in exercises]})
    else:
        return jsonify({'message': 'No exercises found for this user.'}), 404


#Add New Exercise
@exercise_routes.route('/new' , methods=['POST'])
# @login_required
def add_exercise():
    form = ExerciseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_exercise = Exercise(
            userid=current_user.id,
            name=form.name.data,
            instructions=form.instructions.data,
            musclegroup=form.musclegroup.data,
            equipment=form.equipment.data,
            sets=form.sets.data,
            reps=form.reps.data,
            time=form.time.data
        )

        db.session.add(new_exercise)
        db.session.commit()

        return jsonify({
            'message': 'Exercise created successfully',
            'exercise': new_exercise.to_dict()
        }), 201

    return jsonify({
        'message': 'Invalid Exercise data',
        'errors': form.errors
    }), 400


# Update Exercise
@exercise_routes.route('/update/<exerciseid>', methods=['GET', 'PUT'])
@login_required
def update_exercise(exerciseid):
    exercise = Exercise.query.get(exerciseid)

    if not exercise:
        return jsonify({'message': 'Exercise doesn\'t exist'}), 404

    if exercise.userid != current_user.id:
        return jsonify({'message': 'Unauthorized: You cannot edit this exercise'}), 403

    form = ExerciseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        exercise.name = form.name.data
        exercise.instructions = form.instructions.data
        exercise.musclegroup = form.musclegroup.data
        exercise.equipment = form.equipment.data
        exercise.sets = form.sets.data
        exercise.reps = form.reps.data
        exercise.time = form.time.data

        db.session.commit()

        return jsonify({
            'message': 'Exercise updated successfully',
            'exercise': exercise.to_dict()
        }), 200

    return jsonify({
        'message': 'Invalid Exercise data',
        'errors': form.errors
    }), 400


#Delete Exercise
@exercise_routes.route('<int:exerciseid>', methods=['DELETE'])
# @login_required
def delete_exercise(exerciseid):
    exercise = Exercise.query.get(exerciseid)

    if exercise:
        if exercise.userid != current_user.id:
            return {'message': 'Unauthorized: Deletion cant be completed'}, 403

        db.session.delete(exercise)
        db.session.commit()
        return {'message': 'Exercise deleted successfully'}, 200
    
    return {'error': 'Exercise doesnt exists'}


        

