# Example function to create workouts and associate exercises
def create_workouts(db):
    for workout_data in workouts:
        workout = Workout(
            userid=workout_data['userid'],
            title=workout_data['title'],
            description=workout_data['description'],
            exercise_type=workout_data['exercise_type']
        )
        
        # Associate up to six exercises with the workout
        for exercise_id in workout_data['exercise_ids']:
            exercise = Exercise.query.get(exercise_id)
            if exercise:
                workout.exercises.append(exercise)
        
        # Add the workout to the session and commit
        db.session.add(workout)
    
    db.session.commit()

    # /**************************************************************************************\

    # Example function to create workouts and associate exercises
def create_workouts(db):
    for workout_data in workouts:
        # Create a new Workout instance
        workout = Workout(
            userid=workout_data['userid'],
            title=workout_data['title'],
            description=workout_data['description'],
            exercise_type=workout_data['exercise_type']
        )
        # Add the exercise to the workout
        exercise = Exercise.query.get(workout_data['exercise_id'])
        if exercise:
            workout.exercise = exercise
        
        # Add the workout to the session and commit
        db.session.add(workout)
    
    db.session.commit()

    # /************************************************************\

    # Function to create comments for events
def create_comments(db):
    for comment_data in comments:
        comment = Comment(
            userid=comment_data['userid'],
            event_id=comment_data['event_id'],
            comment=comment_data['comment']
        )
        db.session.add(comment)
    
    db.session.commit()
    print("Seed data for comments added successfully.")

    # /*******************************************************************\

    # Example function to create events and associate users
def create_events(db):
    for event_data in events:
        # Create a new Event instance
        event = Event(
            userid=event_data['userid'],
            title=event_data['title'],
            startdate=event_data['startdate'],
            enddate=event_data['enddate'],
            description=event_data['description']
        )
        db.session.add(event)
    
    db.session.commit()
    print("Seed data for events added successfully.")

    # /***********************************************\

    # Example function to create comments and associate exercises
def create_comments(db):
    for comment_data in comments:
        # Create a new Comment instance
        comment = Comment(
            userid=comment_data['userid'],
            comment=comment_data['comment'],
            event_id=comment_data['event_id']
        )
        # Add the exercises to the comment using the association table
        for exercise_id in comment_data['exercise_ids']:
            exercise = Exercise.query.get(exercise_id)
            if exercise:
                comment.exercises.append(exercise)
        
        # Add the comment to the session and commit
        db.session.add(comment)
    db.session.commit()
    print("Seed data for comments added successfully.")
    # /**********************************************************\

    # Example function to create comments and associate exercises
def create_comments(db):
    for comment_data in comments:
        # Create a new Comment instance
        comment = Comment(
            userid=comment_data['userid'],
            comment=comment_data['comment'],
            event_id=comment_data['event_id']
        )
        # Add the exercises to the comment using the association table
        for exercise_id in comment_data['exercise_ids']:
            exercise = Exercise.query.get(exercise_id)
            if exercise:
                comment.exercises.append(exercise)
        
        # Add the comment to the session and commit
        db.session.add(comment)
    db.session.commit()
    print("Seed data for comments added successfully.")