from flask import jsonify, Blueprint, request
from ..models import Comment, db
from ..forms import CommentForm
from flask_login import login_required, current_user


comment_routes = Blueprint('comment', __name__)


# Get all event comments
@comment_routes.route('/event/<int:eventid>')
def comments_by_event(eventid):
    comments = Comment.query.filter_by(eventid=eventid).all() 
    
    if comments:
        return jsonify({'comments': [comment.to_dict() for comment in comments]})
    else:
        return jsonify({'message': 'No comments found for this event.'}), 404
    

# Get all exercise comments
@comment_routes.route('/exercise/<int:exerciseid>')
def comments_by_exercise(exerciseid):
    comments = Comment.query.filter_by(exerciseid=exerciseid).all()  
    
    if comments:
        return jsonify({'comments': [comment.to_dict() for comment in comments]})
    else:
        return jsonify({'message': 'No comments found for this exercise.'}), 404

#Get comment by user
@comment_routes.route('/user')
# @login_required
def comment_by_user():
    comments = Comment.query.filter(Comment.userid == current_user.id).all()

    if comments:
         return jsonify({'comments': [comment.to_dict() for comment in comments]})
    else:
        return jsonify({'message': 'No comments found for this user.'}), 404


#Add New event comment
@comment_routes.route('/event/<int:eventid>/new', methods=['POST'], endpoint='add_event_comment')
@login_required
def add_comment(eventid):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    
    if form.validate_on_submit():
        new_comment = Comment(
            userid=current_user.id,
            event_id=eventid,  
            title=form.title.data,
            comment=form.comment.data,            
        )

        db.session.add(new_comment)
        db.session.commit()

        return jsonify({
            'message': 'Comment created successfully',
            'comment': new_comment.to_dict()
        }), 201

    return jsonify({
        'message': 'Invalid comment data',
        'errors': form.errors
    }), 400



# Update event comment
@comment_routes.route('/event/<int:eventid>/update/<int:commentid>', methods=['GET', 'PUT'], endpoint='update_event_comment')
@login_required
def update_comment(eventid, commentid):
    # Fetch the comment using the provided commentid
    comment = Comment.query.get(commentid)

    if not comment:
        return jsonify({'message': 'Comment doesn\'t exist'}), 404

    # Ensure the current user is the one who created the comment
    if comment.userid != current_user.id:
        return jsonify({'message': 'Unauthorized: You cannot edit this comment'}), 403

    form = CommentForm()

    # Handle the CSRF token automatically if you are using Flask-WTF
    if form.validate_on_submit():
        comment.comment = form.comment.data
        
        # Commit the changes to the database
        db.session.commit()

        return jsonify({
            'message': 'Comment updated successfully',
            'comment': comment.to_dict()
        }), 200

    return jsonify({
        'message': 'Invalid comment data',
        'errors': form.errors
    }), 400



#Add New exercise comment
@comment_routes.route('/exercise/<int:exerciseid>/new', methods=['POST'], endpoint='add_exercise_comment')
@login_required
def add_comment(exerciseid):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    
    if form.validate_on_submit():
        new_exercise_comment = Comment(
            userid=current_user.id,
            exercise_id=exerciseid,
            title=form.title.data,  
            comment=form.comment.data,            
        )

        db.session.add(new_exercise_comment)
        db.session.commit()

        return jsonify({
            'message': 'Comment created successfully',
            'comment': new_exercise_comment.to_dict()
        }), 201

    return jsonify({
        'message': 'Invalid comment data',
        'errors': form.errors
    }), 400



# Update exercise comment
@comment_routes.route('/exercise/<int:exerciseid>/update/<int:commentid>', methods=['GET', 'PUT'], endpoint='update_exercise_comment')
@login_required
def update_comment(exerciseid, commentid):
    # Fetch the comment using the provided commentid
    comment = Comment.query.get(commentid)

    if not comment:
        return jsonify({'message': 'Comment doesn\'t exist'}), 404

    # Ensure the current user is the one who created the comment
    if comment.userid != current_user.id:
        return jsonify({'message': 'Unauthorized: You cannot edit this comment'}), 403

    form = CommentForm()

    # Handle the CSRF token automatically if you are using Flask-WTF
    if form.validate_on_submit():
        comment.comment = form.comment.data
        
        # Commit the changes to the database
        db.session.commit()

        return jsonify({
            'message': 'Comment updated successfully',
            'comment': comment.to_dict()
        }), 200

    return jsonify({
        'message': 'Invalid comment data',
        'errors': form.errors
    }), 400



#Delete comment
@comment_routes.route('/<commentid>', methods=['DELETE'])
# @login_required
def delete_comment(commentid):
    comment = Comment.query.get(commentid)

    if comment:
        if Comment.userid != current_user.id:
            return {'message': 'Unauthorized: Deletion cant be completed'}, 403

        db.session.delete(comment)
        db.session.commit()
        return {'message': 'Comment deleted successfully'}, 200
    
    return {'error': 'Comment doesnt exists'}