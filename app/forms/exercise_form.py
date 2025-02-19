from typing import Optional
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length, Optional
from ..models import Exercise
from .FormOptions import MUSCLE_GROUP, SETS, REPS, TIME


def exercise_exsist(form, field):
    name = field.data
    exercise = Exercise.query.filter(Exercise.name == name).first()
    if exercise:
        raise ValidationError('Exercise already exists')


class ExerciseForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=3, max=50)])
    instructions = TextAreaField('Instructions', validators=[DataRequired(), Length(min=10, max=255)])
    musclegroup = SelectField('Muscle Group', choices=MUSCLE_GROUP, validators=[DataRequired()])
    equipment = StringField('Equipment', validators=[DataRequired(), Length(min=3, max=50)])
    sets = SelectField('Recommended Amount of Sets', choices=SETS, validators=[Optional()], default='0')
    reps = SelectField('Recommended Amount of Reps', choices=REPS, validators=[Optional()], default='0')
    time = SelectField('Recommended Amount of Time', choices=TIME, validators=[Optional()], default='0')
