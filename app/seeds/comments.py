from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


# Adds demo exersices, you can add other exercises here if you want
def seed_comments():
    comments = Comment( userid=1, title='Awesome', comment='Great class! Really enjoyed it.', event_id= 1, exercise_ids=1)
    comments2 = Comment(userid=2, title='Awesome', comment='I struggled with the plank, but I will improve!', event_id= 3,exercise_ids=3)
    comments3 = Comment(userid=3, title='Awesome', comment='Can we do more push-ups next time?', event_id=  4, exercise_ids=1)
    comments4 = Comment(userid=4, title='Awesome', comment='This was a fantastic workout session.', exercise_ids=2)
    comments1 = Comment(userid=1, title='Awesome', comment= 'Cant wait for the next running session!', event_id=  2, exercise_ids=2)
    comments5 = Comment(userid=2, title='Awesome', comment='Burpees are killer, but I love them!', exercise_ids= 4)
    comments7 = Comment(userid=3, title='Awesome', comment='Planks are tough, but I felt strong after.', event_id=  3, exercise_ids=3)
    comments6 = Comment(userid=4, title='Awesome', comment='When will we do another full body workout?', event_id=  4, exercise_ids=4)
    
    db.session.add(comments)
    db.session.add(comments1)
    db.session.add(comments2)
    db.session.add(comments3)
    db.session.add(comments4)
    db.session.add(comments5)
    db.session.add(comments6)
    db.session.add(comments7)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))        
    db.session.commit()