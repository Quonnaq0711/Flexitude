"""empty message

Revision ID: 9e9353d9cbbd
Revises: 6ef79c483b7c
Create Date: 2025-01-14 16:13:10.024499

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9e9353d9cbbd'
down_revision = '6ef79c483b7c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstname', sa.String(length=50), nullable=False),
    sa.Column('lastname', sa.String(length=50), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('exercises',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userid', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('instructions', sa.Text(), nullable=False),
    sa.Column('musclegroup', sa.String(), nullable=False),
    sa.Column('equipment', sa.String(), nullable=False),
    sa.Column('sets', sa.String(), nullable=True),
    sa.Column('reps', sa.String(), nullable=True),
    sa.Column('time', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['userid'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('workouts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userid', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('exercise_type', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['userid'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userid', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('startdate', sa.TIMESTAMP(), nullable=False),
    sa.Column('enddate', sa.TIMESTAMP(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('workoutid', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['userid'], ['user.id'], ),
    sa.ForeignKeyConstraint(['workoutid'], ['workouts.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('workout_exercises',
    sa.Column('workout_id', sa.Integer(), nullable=False),
    sa.Column('exercise_ids', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['exercise_ids'], ['exercises.id'], ),
    sa.ForeignKeyConstraint(['workout_id'], ['workouts.id'], ),
    sa.PrimaryKeyConstraint('workout_id', 'exercise_ids')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userid', sa.Integer(), nullable=False),
    sa.Column('comment', sa.Text(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=True),
    sa.Column('exercise_ids', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], ),
    sa.ForeignKeyConstraint(['exercise_ids'], ['exercises.id'], ),
    sa.ForeignKeyConstraint(['userid'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comments')
    op.drop_table('workout_exercises')
    op.drop_table('events')
    op.drop_table('workouts')
    op.drop_table('exercises')
    op.drop_table('user')
    # ### end Alembic commands ###
