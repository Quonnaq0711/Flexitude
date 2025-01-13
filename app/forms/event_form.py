from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateField, SelectField
from wtforms.validators import DataRequired, Length, ValidationError
from datetime import datetime
from ..models import Workout  # Make sure to import the Workout model
from .FormOptions import WORKOUTS


def future_date(form, field):
    startdate = form.startdate.data
    enddate = form.enddate.data

    if startdate < datetime.now().date():
        raise ValidationError('Start date must be a future date')
    
    if enddate < startdate:
        raise ValidationError('End date must be after start date')


class EventForm(FlaskForm):
    title = StringField('Title:', validators=[DataRequired(), Length(min=3, max=50)])
    startdate = DateField('Start Date:', format='%m-%d-%Y', validators=[DataRequired(), future_date])
    enddate = DateField('End Date:', format='%m-%d-%Y', validators=[DataRequired(), future_date])
    description = TextAreaField('Description:', validators=[DataRequired(), Length(min=10, max=300)])
    workout = SelectField('Workout', coerce=int, choices=WORKOUTS, validators=[DataRequired()])
