from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(min=3, max=50)])
    comment = TextAreaField('Comments', validators=[DataRequired(), Length(min=10, max=255)])