from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, SelectMultipleField
from wtforms.validators import DataRequired, Length, Optional, ValidationError
from models import Exercise
from FormOptions import EXERCISE_TYPES

def get_exercise(form, field):
    exercises = Exercise.query.all()
    return [(Exercise.id, Exercise.name) for exercise in exercises]

def validate_exercises(form, field):
    if len(field.data) > 6:
        raise ValidationError('You can select up to 6 exercises.')

class WorkoutForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(min=3, max=50)])
    description = TextAreaField('Description', validators=[DataRequired(), Length(min=10, max=300)])
    exercise_type = SelectField('Exercise Type', choices=EXERCISE_TYPES, validators=[DataRequired()])
    exercises = SelectMultipleField('Exercises', choices=get_exercise(), coerce=int, validators=[Optional(), validate_exercises])
    
    