from flask import Blueprint, request, jsonify
from app.models import db, Workout, Exercise, Event

search_routes = Blueprint('search', __name__)

@search_routes.route('/')
def search():
    # Extract query parameters
    search_query = request.args.get('q', '').strip()  # For text-based search
    musclegroup = request.args.get('musclegroup', '').strip()  
    eventtitle = request.args.get('eventtitle', '').strip() 
    workout = request.args.get('workout', '').strip()

    # Pagination parameters
    page = request.args.get('page', 1, type=int)  # Current page (default: 1)
    per_page = request.args.get('per_page', 10, type=int)  # Items per page (default: 10)

    # Start with the base query on Exercise
    query = db.session.query(Exercise)

    # Apply filters dynamically
    if search_query:
        query = query.filter(Exercise.name.ilike(f"%{search_query}%"))
    if musclegroup:
        query = query.filter(Exercise.musclegroup.ilike(f"%{musclegroup}%"))
    if workout:
        query = query.join(Workout).filter(Workout.title.ilike(f"%{workout}%"))
    if eventtitle:
        query = query.join(Event).filter(Event.title.ilike(f"%{eventtitle}%"))

    # Apply pagination
    paginated_results = query.paginate(page=page, per_page=per_page)

    # Prepare results with pagination metadata
    response = {
        "exercises": [exercise.to_dict() for exercise in paginated_results.items],
        "total": paginated_results.total,
        "page": paginated_results.page,
        "pages": paginated_results.pages,
        "per_page": paginated_results.per_page
    }

    return jsonify({'response': response}), 200
