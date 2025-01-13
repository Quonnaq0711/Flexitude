from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    comment = TextAreaField('Comments', validators=[DataRequired(), Length(min=10, max=255)])