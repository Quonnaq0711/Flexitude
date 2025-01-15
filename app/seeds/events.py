from app.models import db, Event, environment, SCHEMA
from sqlalchemy import text
from datetime import datetime


def seed_events():
    events = Event(
        userid=1,
        title= 'Yoga for Beginners',
        startdate=datetime.strptime('01-15-2025', '%m-%d-%Y').date(),
        enddate=datetime.strptime('01-20-2025', '%m-%d-%Y').date(),
        description='A relaxing yoga class for beginners.',
        workoutid=1
    )
    events1 = Event(
        userid=2,
        title= 'Running Marathon Preparation',
        startdate=datetime.strptime('02-15-2025', '%m-%d-%Y').date(),
        enddate=datetime.strptime('02-20-2025', '%m-%d-%Y').date(),
        description='A session to prepare for the upcoming marathon.',
        workoutid=4
    )
    events2 = Event(
        userid=3,
        title= 'Advanced Pilates Class',
        startdate=datetime.strptime('01-25-2025', '%m-%d-%Y').date(),
        enddate=datetime.strptime('02-20-2025', '%m-%d-%Y').date(),
        description= 'A challenging Pilates class for experienced participants.',
        workoutid=2
    )
    events3 = Event(
        userid=4,
        title= 'Full Body Workout',
        startdate=datetime.strptime('02-15-2025', '%m-%d-%Y').date(),
        enddate=datetime.strptime('02-20-2025', '%m-%d-%Y').date(),
        description= 'A full-body workout to target all muscle groups.',
        workoutid=3
    )

    db.session.add(events)
    db.session.add(events1)
    db.session.add(events2)
    db.session.add(events3)
    db.session.commit()


def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))
    db.session.commit()        