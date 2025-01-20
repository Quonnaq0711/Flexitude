from flask import jsonify, Blueprint, request

from app.models.workout import Workout
from ..models import Event, db
from ..forms import EventForm
from flask_login import login_required, current_user


event_routes = Blueprint('event', __name__)


# Get all events
@event_routes.route('/')
def events():
    events = Event.query.all()
    return jsonify({'events': [event.to_dict() for event in events]})

# event by id
@event_routes.route('/<eventid>')
def events_by_id(eventid):
    event = Event.query.get(eventid)

    if event:
         return jsonify({'events': event.to_dict()})
    else:
        return jsonify({'message': 'No event details found.'}), 404


#Get event by user
@event_routes.route('/user')
# @login_required
def event_by_user():
    events = Event.query.filter(Event.userid == current_user.id).all()

    if events:
         return jsonify({'events': [event.to_dict() for event in events]})
    else:
        return jsonify({'message': 'No events found for this user.'}), 404


#Add New event
@event_routes.route('/new', methods=['POST'])
@login_required
def add_event():
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # Fetch the workout based on the provided workout ID
        workout_id = form.workout.data
        workout = Workout.query.get(workout_id)

        if not workout:
            return jsonify({'message': 'Invalid workout ID'}), 400

        new_event = Event(
            userid=current_user.id,
            title=form.title.data,
            startdate=form.startdate.data,
            enddate=form.enddate.data,
            description=form.description.data,
            workout=workout  # Set the single workout
        )

        db.session.add(new_event)
        db.session.commit()

        return jsonify({
            'message': 'Event created successfully',
            'event': new_event.to_dict()
        }), 201

    return jsonify({
        'message': 'Invalid event data',
        'errors': form.errors
    }), 400



# Update event
@event_routes.route('/update/<int:eventid>', methods=['GET', 'PUT'])
#@login_required
def update_event(eventid):
    event = Event.query.get(eventid)
    if not event:
        return jsonify({"message": "Event not found"}), 404

    if request.method == 'GET':
        return jsonify(event.to_dict()), 200

    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        event.title = form.title.data
        event.startdate = form.startdate.data
        event.enddate = form.enddate.data
        event.description = form.description.data
        workout_id = form.workout.data
        event.workout = Workout.query.get(workout_id)

        db.session.commit()
        return jsonify({"message": "Event updated successfully", "event": event.to_dict()}), 200

    return jsonify({"message": "Invalid event data", "errors": form.errors}), 400



#Delete event
@event_routes.route('delete/<eventid>', methods=['DELETE'])
# @login_required
def delete_event(eventid):
    event = Event.query.get(eventid)

    if event:
        if event.userid != current_user.id:
            return {'message': 'Unauthorized: Deletion cant be completed'}, 403

        db.session.delete(event)
        db.session.commit()
        return {'message': 'Event deleted successfully'}, 200
    
    return {'error': 'Event doesnt exists'}