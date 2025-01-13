from flask import jsonify, Blueprint, request
from ..models import Event, db
from ..forms import EventForm
from flask_login import login_required, current_user


event_routes = Blueprint('event', __name__)


# Get all events
@event_routes.route('/')
def events():
    events = Event.query.all()
    return jsonify({'events': [event.to_dict() for event in events]})


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
@event_routes.route('/new' , methods=['POST'])
# @login_required
def add_event():
    form = EventForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_event = event(
            userid=current_user.id,
            title=form.title.data,
            startdate=form.startdate.data,
            enddate=form.enddate.data,
            description=form.description.data,
            workout=form.workout.data
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
@event_routes.route('/update/<eventid>', methods=['GET', 'PUT'])
@login_required
def update_event(eventid):
    event = Event.query.get(eventid)

    if not event:
        return jsonify({'message': 'Event doesn\'t exist'}), 404

    if event.userid != current_user.id:
        return jsonify({'message': 'Unauthorized: You cannot edit this event'}), 403

    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        event.title = form.title.data
        event.startdate = form.startdate.data
        event.enddate = form.enddate.data
        event.description = form.description.data
        event.workout = form.workout.data
        

        db.session.commit()

        return jsonify({
            'message': 'Event updated successfully',
            'event': event.to_dict()
        }), 200

    return jsonify({
        'message': 'Invalid event data',
        'errors': form.errors
    }), 400


#Delete event
@event_routes.route('/<eventid>', methods=['DELETE'])
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