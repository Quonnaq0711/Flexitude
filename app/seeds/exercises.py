from app.models import db, Exercise, environment, SCHEMA
from sqlalchemy.sql import text


# Adds demo exersices, you can add other exercises here if you want
def seed_exercises():
    arms = Exercise(        
        userid=1,
        name='Bicep Curls',
        instructions='Stand with feet shoulder-width apart, holding a dumbbell in each hand with arms fully extended. Curl the weights towards your shoulders while keeping your elbows stationary. Lower the weights back to the starting position.', 
        musclegroup='Arms',
        equipment='Dumbbells', 
        sets=4 ,
        reps='15'
        )
    arm1 = Exercise(
        userid=2,
        name='Tricep Dips',
        instructions='Sit on the edge of the chair, place your hands next to your hips, and extend your legs out in front of you. Lift your body off the chair and lower it by bending your elbows to a 90-degree angle. Push yourself back up to the starting position.',
        musclegroup='Arms',
        equipment='Chair or bench',
        sets=3,
        reps='12'
        )
    arm2 = Exercise(
        userid=3,
        name='Shoulder Press',
        instructions=' Stand with feet shoulder-width apart, holding a dumbbell in each hand at shoulder height. Press the weights overhead until your arms are fully extended. Lower the weights back to shoulder height.',
        musclegroup='Arms',
        equipment='Dumbbells',
        sets=4,
        reps='12'
        )
    arm3 = Exercise(
        userid=3,
        name='Hammer Curls',
        instructions='Stand with feet shoulder-width apart, holding a dumbbell in each hand with palms facing your body. Curl the weights towards your shoulders while keeping your elbows stationary. Lower the weights back to the starting position.', 
        musclegroup='Arms',
        equipment='Dumbbells',
        sets=4,
        reps="15"
        )
    shoulder = Exercise(
        userid=3,
        name='Shoulder Press',
        instructions='Stand with feet shoulder-width apart, holding a dumbbell in each hand at shoulder height. Press the weights overhead until your arms are fully extended. Lower the weights back to shoulder height.',
        musclegroup='Arms',
        equipment='Dumbbells',
        sets=4,
        reps='12'
        )
    shoulder1 = Exercise(
        userid=2,
        name='Front Raises',
        instructions='Stand with feet shoulder-width apart, holding a dumbbell in each hand in front of your thighs with palms facing your body. Raise one arm in front of you until it is level with your shoulder. Lower it back to the starting position and repeat with the other arm. Continue alternating arms',
        musclegroup='Shoulders',
        equipment='Dumbbells',
        sets=3,
        reps='15'
        )
    shoulder2 = Exercise(
        userid=2,
        name=' Rear Delt Flyes',
        instructions='Bend at the hips with a slight bend in your knees, holding dumbbells with palms facing each other. Raise your arms out to the sides until they are level with your shoulders, squeezing your shoulder blades together. Lower the weights back to the starting position.',
        musclegroup='Shoulders',
        equipment='Dumbbells',
        sets=3,
        reps='12'
        )
    shoulder3 = Exercise(
        userid=1,
        name='Upright Rows',
        instructions='Stand with feet shoulder-width apart, holding a barbell or dumbbells in front of your thighs. Lift the weights straight up to your chest, keeping them close to your body and leading with your elbows. Lower the weights back to the starting position.',
        musclegroup='Shoulders',
        equipment='Barbell or Dumbbells',
        sets=3,
        reps='12'
        )
    chest = Exercise(
        userid=1,
        name='Bench Press',
        instructions='Lie on a flat bench with your feet flat on the floor. Grip the barbell slightly wider than shoulder-width apart. Lower the barbell to your chest, then press it back up to the starting position.',
        musclegroup='Chest',
        equipment='Barbell',
        sets=4,
        reps='12'
        )
    chest1 = Exercise(
        userid=1,
        name='Push-Ups',
        instructions='Start in a plank position with hands slightly wider than shoulder-width apart. Lower your body until your chest nearly touches the floor, then push back up. Keep your body in a straight line throughout.',
        musclegroup='Chest',
        equipment='None',
        sets=4,
        reps='15'
        )
    chest2 = Exercise(
        userid=2,
        name='Chest Dips',
        instructions='Grip the dip bars and lift yourself up. Lean forward slightly as you lower your body by bending your elbows. Push yourself back up to the starting position.',
        musclegroup='Chest',
        equipment='Dip Bars',
        sets=3,
        reps='10'
        )
    chest3 = Exercise(
        userid=3,
        name='Incline Dumbbell Press',
        instructions='Set the bench to a 30-45 degree incline. Lie back with dumbbells in each hand at shoulder level. Press the weights overhead until arms are fully extended, then lower back to the starting position.',
        musclegroup='Chest',
        equipment='Dumbbells',
        sets=3,
        reps='10'
        )
    abdominals = Exercise(
        userid=3,
        name='Crunches',
        instructions='Lie on your back with your knees bent and feet flat on the floor. Place your hands behind your head. Lift your upper body towards your knees, exhaling as you crunch. Lower back down.',
        musclegroup='Abs',
        equipment='None',
        sets=3,
        reps='20'
        )
    abdominals1 = Exercise(
        userid=3,
        name='Plank',
        instructions='Start in a forearm plank position with your body in a straight line from head to heels, keeping your core tight and engaged.',
        musclegroup='Abs',
        equipment='None',
        sets=0,
        time="30 seconds"
        )
    abdominals2 = Exercise(
        userid=1,
        name='Russian Twist',
        instructions='Sit on the floor with your knees bent and feet lifted off the ground. Hold a medicine ball or dumbbell with both hands. Lean back slightly and twist your torso to each side, tapping the weight on the floor.',
        musclegroup='Abs',
        equipment='Medicine Ball or Dumbbell',
        sets=1,
        reps='20'
        )
    abdominals3 = Exercise(
        userid=2,
        name='Leg Raises',
        instructions='Lie on your back with your legs straight and hands under your hips. Lift your legs up towards the ceiling while keeping them straight. Lower them back down without touching the floor.',
        musclegroup='Abs',
        equipment='None',
        sets=3,
        reps='15'
        )
    butt = Exercise(
        userid=2,
        name='Squats',
        instructions='Stand with feet shoulder-width apart, toes slightly turned out. Lower your body by bending your knees and hips, keeping your chest up and back straight. Push through your heels to return to the starting position.',
        musclegroup='Butt/Legs',
        equipment='None (Optional: Dumbbells or Barbell)',
        sets=4,
        reps='15'
        )
    butt1 = Exercise(
        userid=2,
        name='Lunges',
        instructions='Stand with feet hip-width apart. Step forward with one leg, lowering your hips until both knees are bent at 90 degrees. Push through the front heel to return to the starting position. Alternate legs.',
        musclegroup='Butt/Legs',
        equipment='None (Optional: Dumbbells)',
        sets=4,
        reps='15'
        )
    butt2 = Exercise(
        userid=1,
        name='Fire Hydrants',
        instructions='Start on all fours with your knees under your hips and hands under your shoulders. Lift one leg out to the side, keeping the knee bent. Lower back down.',
        musclegroup='Butt/Legs',
        equipment='None (Optional: Resistance Band)',
        sets=4,
        reps='20'
        )
    butt3 = Exercise(
        userid=3,
        name='Hip Thrusts',
        instructions='Sit on the floor with your upper back against a bench, knees bent, and feet flat on the floor. Place a barbell across your hips. Lift your hips towards the ceiling, squeezing your glutes at the top. Lower back down.',
        musclegroup='Butt/Legs',
        equipment= 'Bench or Step (Optional: Barbell)',
        sets=4,
        reps='15'
        )
    cardio = Exercise(
        userid=3,
        name='Running',
        instructions='Sit on the floor with your upper back against a bench, knees bent, and feet flat on the floor. Place a barbell across your hips. Lift your hips towards the ceiling, squeezing your glutes at the top. Lower back down.',
        musclegroup='Cardio',
        equipment= 'None (Optional: Treadmill)',
        sets=0,
        time="5 minutes"
        )
    cardio1 = Exercise(
        userid=3,
        name='Running',
        instructions='Run at a steady pace for a set distance or time. Maintain proper form by keeping your chest up, shoulders back, and arms swinging naturally.',
        musclegroup='Cardio',
        equipment= 'None (Optional: Treadmill)',
        sets=0,
        time="30 minutes"
        )
    cardio2 = Exercise(
        userid=1,
        name='Burpees',
        instructions='Start in a standing position. Drop into a squat, place your hands on the floor, and kick your feet back into a plank position. Perform a push-up, then jump your feet back to your hands and explode into a jump.',
        musclegroup='Cardio',
        equipment= 'None',
        sets=3,
        reps='15'
        )
    cardio3 = Exercise(
        userid=1,
        name='Stair Climbing',
        instructions='Find a set of stairs or use a stair climber machine. Climb the stairs at a steady pace, using your legs to propel yourself upward.',
        musclegroup='Cardio',
        equipment= 'Stairs or Stair Climber Machine',
        sets=3,
        time='15 minutes'
        )
    db.session.add(arms)
    db.session.add(arm1)
    db.session.add(arm2)
    db.session.add(arm3)
    db.session.add(shoulder)
    db.session.add(shoulder1)
    db.session.add(shoulder2)
    db.session.add(shoulder3)
    db.session.add(chest)
    db.session.add(chest1)
    db.session.add(chest2)
    db.session.add(chest3)
    db.session.add(abdominals)
    db.session.add(abdominals1)
    db.session.add(abdominals2)
    db.session.add(abdominals3)
    db.session.add(butt)
    db.session.add(butt1)
    db.session.add(butt2)
    db.session.add(butt3)
    db.session.add(cardio)
    db.session.add(cardio1)
    db.session.add(cardio2)
    db.session.add(cardio3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_exercises():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.exercises RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM exercises"))
        
    db.session.commit()