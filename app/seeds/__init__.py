from flask.cli import AppGroup
from .users import seed_user, undo_user
from .exercises import seed_exercises, undo_exercises
from .comments import seed_comments, undo_comments
from .events import seed_events, undo_events
from .workouts import seed_workouts, undo_workouts
# from app import app, db 
from app.models import SCHEMA, environment, db

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # with app.app_context(): 
        if environment == 'production':
            # Before seeding in production, you want to run the seed undo 
            # command, which will  truncate all tables prefixed with 
            # the schema name (see comment in users.py undo_users function).
            # Make sure to add all your other model's undo functions below
           undo_comments()
           undo_events()
           undo_workouts()       
           undo_exercises()
           undo_user()
        
        # Run the seeding functions
        seed_user()
        seed_exercises()
        seed_workouts()
        seed_events()        
        seed_comments()
        # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # with app.app_context():    
    undo_comments()
    undo_events()
    undo_workouts()       
    undo_exercises()
    undo_user()
        
        
        
        
        # Add other undo functions here
