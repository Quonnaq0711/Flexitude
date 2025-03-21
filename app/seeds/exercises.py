from dis import Instruction
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
    arm4 = Exercise(
        userid=2,
        name='Lateral Raises',
        instructions=' Stand with feet shoulder-width apart, holding a dumbbell in each hand at your sides. Raise your arms out to the sides until they are level with your shoulders. Lower the weights back to the starting position.',
        musclegroup='Arms',
        equipment='Dumbbells',
        sets=3,
        reps='15'
        )
    arm5 = Exercise(
        userid = 1,
        name='Overhead Tricep Extension',
        instructions='Stand with feet shoulder-width apart, holding one dumbbell with both hands overhead. Keeping your upper arms close to your ears, lower the dumbbell behind your head by bending your elbows. Extend your arms back to the starting position.',
        musclegroup='Arms',
        equipment='Dumbbells',
        sets=3,
        reps='15'
    )
    arm6 = Exercise(
        userid = 3,
        name ='Push-Ups',
        instructions='Start in a plank position with your hands slightly wider than shoulder-width apart. Lower your body until your chest nearly touches the floor, then push yourself back up to the starting position. Keep your body in a straight line throughout the movement.',
        musclegroup='Arms',
        equipment='None',
        sets= 3,
        reps='10' 
    )
    arms7 = Exercise(
        userid = 4,
        name = 'Concentration Curls',
        instructions='Sit on a bench with your legs spread and feet flat on the floor. Hold a dumbbell in one hand, rest your elbow on the inside of your thigh, and curl the weight towards your shoulder. Lower the weight back to the starting position. Complete on both sides for each set.',
        musclegroup='Arms',
        equipment='Dumbbells',
        sets=3,
        reps='12' 
    )
    arms8 = Exercise(
        userid = 4,
        name = 'Front Raises',
        instructions='Stand with feet shoulder-width apart, holding a dumbbell in each hand in front of your thighs with palms facing your body. Raise one arm in front of you until it is level with your shoulder. Lower it back to the starting position and repeat with the other arm. Continue alternating arms.',
        musclegroup='Arms',
        equipment='Dumbbells',
        sets= 3,
        reps='12'
    )
    arms9 = Exercise(
        userid= 2,
        name= 'Close-Grip Bench Press',
        instructions='Lie on a bench with your feet flat on the floor. Grip the barbell with your hands shoulder-width apart and lift it off the rack. Lower the barbell to your chest, then press it back up to the starting position.',
        musclegroup='Arms',
        equipment='Barbell',
        sets=3,
        reps='10'
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
    shoulder4 = Exercise(
        userid=4,
        name='Lateral Raises',
        instructions='Stand with feet shoulder-width apart, holding a dumbbell in each hand at your sides. Raise your arms out to the sides until they are level with your shoulders. Lower the weights back to the starting position.',
        musclegroup='Shoulders',
        equipment='Dumbbells',
        sets=3,
        reps='12'
        )
    shoulder5 = Exercise(
        userid=4,
        name='Arnold Press',
        instructions='Start with dumbbells at shoulder height, palms facing your body. Rotate your wrists outward as you press the weights overhead. Reverse the motion to lower the weights back to the starting position.',
        musclegroup='Shoulders',
        equipment='Dumbbells',
        sets=4,
        reps='12'
    )
    shoulder6 = Exercise(
        userid= 3,
        name='Upright Rows',
        instructions='Stand with feet shoulder-width apart, holding a barbell or dumbbells in front of your thighs. Lift the weights straight up to your chest, keeping them close to your body and leading with your elbows. Lower the weights back to the starting position.',
        musclegroup='Shoulders',
        equipment='Barbell or Dumbbell',
        sets=4,
        reps='12'
    )
    shoulder7= Exercise(
        userid = 1,
        name='Face Pulls',
        instructions='Attach a resistance band or cable to a high anchor point. Pull the handles towards your face, keeping your elbows high and squeezing your shoulder blades together. Return to the starting position.',
        musclegroup='Shoulders',
        equipment='Resistance Band or Cable Machine',
        sets=4,
        reps='15'
    )
    shoulder8= Exercise(
        userid=2,
        name='Shrugs',
        instructions='Stand with feet shoulder-width apart, holding dumbbells or a barbell at your sides. Lift your shoulders as high as possible towards your ears. Lower them back to the starting position.',
        equipment='Barbell or Dumbbells',
        musclegroup='Shoulders',
        sets=4,
        reps='15'
    )
    shoulder9 = Exercise(
        userid=3,
        name='Landmine Press',
        instructions='Place one end of the barbell in a landmine attachment or secure it in a corner. Hold the other end with one hand at shoulder height. Press the barbell overhead, extending your arm. Lower it back to the starting position. Complete on both side for one set.',
        musclegroup='Shoulders',
        equipment='Barbell or Landmine Attachment'
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
    chest4 = Exercise(
        userid=4,
        name='Dumbbell Flyes',
        instructions='Lie on a flat bench with a dumbbell in each hand, arms extended above your chest. Lower the dumbbells out to the sides in a wide arc, keeping a slight bend in your elbows. Bring the weights back together over your chest.',
        musclegroup='Chest',
        equipment='Dumbbells',
        sets=3,
        reps='12'
        )
    chest5 = Exercise(
        userid=3,
        name='Incline Bench Press',
        instructions='Set the bench to a 30-45 degree incline. Lie back and grip the barbell slightly wider than shoulder-width apart. Lower the barbell to your upper chest, then press it back up.',
        musclegroup='Chest',
        equipment='Dumbbell',
        sets=3,
        reps='12'
        )
    chest6 = Exercise(
        userid=2,
        name='Decline Bench Press',
        instructions='Set the bench to a decline. Lie back and grip the barbell slightly wider than shoulder-width apart. Lower the barbell to your lower chest, then press it back up.',
        musclegroup='Chest',
        equipment='Barbell',
        sets=3,
        reps='12'
        )
    chest7 = Exercise(
        userid=1,
        name='Cable Crossovers',
        instructions='Set the cables to the highest position. Stand in the center and pull the cables down and together in front of you with a slight bend in your elbows. Slowly return to the starting position.',
        musclegroup='Chest',
        equipment='Cable Machine',
        sets=4,
        reps='12'
        )
    chest8 = Exercise(
        userid=4,
        name='Svend Press',
        instructions='Stand with feet shoulder-width apart, holding a weight plate with both hands in front of your chest. Push the plate straight out until your arms are fully extended, then bring it back to your chest.',
        musclegroup='Chest',
        equipment='Weight Plate',
        sets=4,
        reps='12'
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
    abdominals4 = Exercise(
        userid=5,
        name='Bicycle Crunches',
        instructions='Lie on your back with your hands behind your head and legs lifted off the floor. Bring your right elbow to your left knee while extending your right leg. Switch sides in a pedaling motion, alternating between left and right.',
        musclegroup='Abs',
        equipment='None',
        sets=4,
        reps='20'
    )
    abdominals5 = Exercise(
        userid=4,
        name='Mountain Climbers',
        instructions='Start in a plank position with your arms straight. Drive one knee toward your chest while keeping the other leg extended. Quickly alternate legs in a running motion, keeping your core tight throughout.',
        musclegroup='Abs',
        equipment='None',
        sets=4,
        reps='1 minute'
    )
    abdominals6 = Exercise(
        userid=4,
        name='V-Ups',
        instructions='Lie on your back with your legs extended and arms overhead. Lift your legs and upper body simultaneously, reaching for your toes with your hands, creating a "V" shape. Lower back down with control.',
        musclegroup='Abs',
        equipment='None',
        sets=4,
        reps='12'
    )
    abdominals7 = Exercise(
        userid=3,
        name='Side Plank',
        instructions='Lie on your side and prop yourself up on your forearm, keeping your body in a straight line from head to heels. Engage your core and hold the position, keeping your hips lifted off the ground. Complete on both sides for one set',
        musclegroup='Abs',
        equipment='None',
        sets=4,
        reps='1 minute per side'
    )
    abdominals8 = Exercise(
        userid=4,
        name='Flutter Kicks',
        instructions='Lie on your back with your legs extended and hands under your glutes. Lift your legs slightly off the floor and alternate kicking them up and down in a fluttering motion, keeping your core engaged.',
        musclegroup='Abs',
        equipment='None',
        sets=4,
        reps='30 seconds'
    )
    abdominals9 = Exercise(
        userid=3,
        name='Hanging Leg Raises',
        instructions='Hang from a pull-up bar with your arms straight and your legs extended. Keeping your legs straight, raise them toward your chest, then slowly lower them back down.',
        musclegroup='Abs',
        equipment='Pull-Up Bar',
        sets=4,
        reps='12'
    )
    butt = Exercise(
        userid=2,
        name='Squats',
        instructions='Stand with feet shoulder-width apart, toes slightly turned out. Lower your body by bending your knees and hips, keeping your chest up and back straight. Push through your heels to return to the starting position.',
        musclegroup='Butt',
        equipment='None (Optional: Dumbbells or Barbell)',
        sets=4,
        reps='15'
        )
    butt1 = Exercise(
        userid=2,
        name='Lunges',
        instructions='Stand with feet hip-width apart. Step forward with one leg, lowering your hips until both knees are bent at 90 degrees. Push through the front heel to return to the starting position. Complete on both side for one set.',
        musclegroup='Butt',
        equipment='None (Optional: Dumbbells)',
        sets=4,
        reps='15 per leg'
        )
    butt2 = Exercise(
        userid=1,
        name='Fire Hydrants',
        instructions='Start on all fours with your knees under your hips and hands under your shoulders. Lift one leg out to the side, keeping the knee bent. Lower back down. Complete on both side for one set',
        musclegroup='Butt',
        equipment='None (Optional: Resistance Band)',
        sets=4,
        reps='20 per leg'
        )
    butt3 = Exercise(
        userid=3,
        name='Hip Thrusts',
        instructions='Sit on the floor with your upper back against a bench, knees bent, and feet flat on the floor. Place a barbell across your hips. Lift your hips towards the ceiling, squeezing your glutes at the top. Lower back down.',
        musclegroup='Butt',
        equipment= 'Bench or Step (Optional: Barbell)',
        sets=4,
        reps='15'
        )
    butt4 = Exercise(
        userid=4,
        name='Glute Bridges',
        instructions='Lie on your back with knees bent and feet flat on the floor. Lift your hips toward the ceiling by pressing through your heels, squeezing your glutes at the top, and slowly lower back down.',
        musclegroup='Butt',
        equipment='None (Optional: Barbell or Resistance Band)',
        sets=4,
        reps='15'
    )
    butt5 = Exercise(
        userid=2,
        name='Step-Ups',
        instructions='Place one foot on an elevated surface (like a bench or box). Push through the heel of your elevated foot to step up, bringing the other foot to meet it. Step down and repeat on the other leg. Complete on both side for one set',
        musclegroup='Butt',
        equipment='None (Optional: Dumbbells)',
        sets=4,
        reps='12 per leg'
    )
    butt6 = Exercise(
        userid=3,
        name='Bulgarian Split Squats',
        instructions='Place one foot behind you on a bench. Lower your hips toward the floor while keeping your torso upright, bending the front leg until your thigh is parallel to the ground. Push back up. Complete on both side for one set',
        musclegroup='Butt',
        equipment='None (Optional: Dumbbells or Barbell)',
        sets=4,
        reps='12 per leg'
    )
    butt7 = Exercise(
        userid= 4,
        name='Donkey Kicks',
        instructions='Start on all fours with knees under hips and hands under shoulders. Lift one leg, keeping the knee bent at 90 degrees, and kick your foot toward the ceiling while squeezing your glute. Lower back down and repeat on the other side. Complete on both side for one set',
        musclegroup='Butt',
        equipment='None (Optional: Ankle Weights)',
        sets=4,
        reps='15 per leg'
    )
    butt8 = Exercise(
        userid=4,
        name='Kettlebell Swings',
        instructions='Stand with feet shoulder-width apart, holding a kettlebell with both hands. Bend your knees slightly and hinge at the hips to swing the kettlebell back between your legs, then drive your hips forward to swing it to chest height.',
        musclegroup='Butt',
        equipment='Kettlebell',
        sets=4,
        reps='20'
    )
    butt9 = Exercise(
        userid=3,
        name='Reverse Lunges',
        instructions='Step backward with one leg, lowering your hips until both knees are at 90-degree angles. Push through the front heel to return to standing, then repeat on the other leg. Complete on both side for one set',
        musclegroup='Butt',
        equipment='None (Optional: Dumbbells)',
        sets=4,
        reps='12 per leg'
    )
    leg= Exercise(
        userid = 4,
        name='Squats',  
        instructions='Stand with feet shoulder-width apart, toes slightly turned out. Lower your body by bending your knees and hips, keeping your chest up and back straight. Push through your heels to return to the starting position.',  
        musclegroup='Legs',  
        equipment='None (Optional: Dumbbells or Barbell)',  
        sets=4,  
        reps='15'
    )
    leg1 = Exercise( 
        userid=5,
        name='Lunges',  
        instructions='Step forward with one leg, lowering your hips until both knees are bent at a 90-degree angle. Push through the heel of the front foot to return to standing. Complete on both sides for one set.',  
        musclegroup='Legs',  
        equipment='None (Optional: Dumbbells)',  
        sets=4,  
        reps='12 per leg'
        )
    leg2 = Exercise(
        userid=3,
        name='Leg Press',  
        instructions='Sit on the leg press machine with feet shoulder-width apart on the platform. Push the platform away by extending your legs, keeping your knees in line with your toes. Slowly return to the starting position.',  
        musclegroup='Legs',  
        equipment='Leg Press Machine',  
        sets=4,  
        reps='12'  
    )
    leg3 = Exercise(
        userid= 5,
        name='Leg Curls',  
        instructions='Lie face down on the leg curl machine with your ankles under the padded bar. Curl your legs toward your glutes, squeezing your hamstrings at the top, and then slowly return to the starting position.',  
        musclegroup='Legs',  
        equipment='Leg Curl Machine',  
        sets=4,  
        reps='12'
    )
    leg4 = Exercise(
        userid= 4,
        name='Step-Ups',  
        instructions='Place one foot on an elevated surface (like a bench or box). Push through the heel of your elevated foot to step up, bringing the other foot to meet it. Step down. Complete on both sides for one set',  
        musclegroup='Legs',  
        equipment='None (Optional: Dumbbells)',  
        sets=4,  
        reps='12 per leg'  
    )
    leg5 = Exercise(
        userid=5,
        name='Bulgarian Split Squats',  
        instructions='Place one foot behind you on a bench. Lower your hips toward the floor while keeping your torso upright, bending the front leg until your thigh is parallel to the ground. Push back up. Complete on both sides for one set.',  
        musclegroup='Legs',  
        equipment='None (Optional: Dumbbells or Barbell)',  
        sets=4,  
        reps='12 per leg'
    )
    leg6 = Exercise(
        userid= 5,
        name='Leg Extensions',  
        instructions='Sit on the leg extension machine with your legs under the padded bar. Extend your legs straight out, squeezing your quads at the top, then slowly lower back down.',  
        musclegroup='Legs',  
        equipment='Leg Extension Machine',  
        sets=4,  
        reps='12'  
    )
    leg7 = Exercise(
        userid=3,
        name='Calf Raises',  
        instructions='Stand with feet shoulder-width apart, either on flat ground or on an elevated surface. Raise your heels as high as possible, squeezing your calves at the top, and then slowly lower back down.',  
        musclegroup='Legs',  
        equipment='None (Optional: Dumbbells or Barbell)',  
        sets=4,  
        reps='20'  
    )
    leg8 = Exercise(
        userid=5,
        name='Romanian Deadlifts',  
        instructions='Stand with feet shoulder-width apart and hold a barbell or dumbbells in front of your thighs. Keeping a slight bend in your knees, hinge at the hips to lower the weights down while maintaining a flat back. Return to standing by driving your hips forward.',  
        musclegroup='Legs',  
        equipment='Barbell or Dumbbells',  
        sets=4,  
        reps='12'  
    )
    leg9 = Exercise(
        userid= 1,
        name='Walking Lunges',  
        instructions='Take a step forward with one leg, lowering your body until both knees are bent at 90 degrees. Push through the front heel to step forward with the other leg and repeat the motion while walking forward.',  
        musclegroup='Legs',  
        equipment='None (Optional: Dumbbells)',  
        sets=4,  
        reps='12 per leg'
    )   
    cardio = Exercise(
        userid=3,
        name='Jump Rope',
        instructions='Stand with feet together and hold the rope handles in each hand. Swing the rope over your head and jump over it as it passes beneath your feet. Keep your elbows close to your sides and jump on the balls of your feet.',
        musclegroup='Cardio',
        equipment='Jump Rope',
        sets=4,
        time="5 minutes"
        )
    cardio1 = Exercise(
        userid=3,
        name='Running',
        instructions='Run at a steady pace for a set distance or time. Maintain proper form by keeping your chest up, shoulders back, and arms swinging naturally.',
        musclegroup='Cardio',
        equipment= 'None or Treadmill',
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
    cardio4 = Exercise(
        userid=1,
        name='Jumping Jacks',
        instructions='Stand with your feet together and arms at your sides. Jump while spreading your legs wide and raising your arms overhead. Return to the starting position and repeat.',
        musclegroup='Cardio',
        equipment='None',
        sets=4,
        time='45 seconds'
    )
    cardio5 = Exercise(
        userid=5,
        name='High Knees',
        instructions='Stand tall with your feet hip-width apart. Jog in place, bringing your knees up towards your chest as high as possible while keeping a brisk pace.',
        musclegroup='Cardio',
        equipment='None',
        sets=4,
        time='45 seconds'
    )
    cardio11 = Exercise(
        userid=5,
        name='Mountain Climbers',
        instructions='Start in a plank position with your arms straight. Drive one knee toward your chest while keeping the other leg extended. Quickly alternate legs in a running motion, keeping your core tight throughout.',
        musclegroup='Cardio',
        equipment='None',
        sets=4,
        time='45 seconds'
        )
    cardio10 = Exercise(
        userid= 4,
        name='Skater Jumps',
        instructions='Stand with feet hip-width apart. Jump to the side, landing on one leg while the other leg extends behind you, mimicking a skating motion. Jump to the opposite side and repeat the motion.',
        musclegroup='Cardio',
        equipment='None',
        sets=4,
        reps='20'
    )
    cardio7 = Exercise(
        userid=4,
        name='Sprinting',
        instructions='Find a flat, open space. Sprint as fast as you can for 20-30 seconds, then slow to a walk for 30-60 seconds to recover. Repeat the process for the desired number of sets.',
        musclegroup='Cardio',
        equipment='None or Treadmill',
        sets=4,
        time='20seconds sprinting, 30seconds walking recovery'
    )
    cardio6 = Exercise(
        userid=5,
        name='Butt Kicks',
        instructions='Stand tall with your feet hip-width apart. Jog in place, kicking your heels up toward your glutes as quickly as possible, engaging your hamstrings.',
        musclegroup='Cardio',
        equipment='None',
        sets=4,
        time='1 minute'
    )
    cardio8 = Exercise(
        userid=3,
        name='Lateral Shuffles',
        instructions='Stand with your feet shoulder-width apart. Shuffle to the right by stepping to the side and quickly bringing the left foot to meet the right. Shuffle to the left and repeat.',
        musclegroup='Cardio',
        equipment='None',
        sets=4,
        time='1 minute'
    )
    cardio9 = Exercise(
        userid=4,
        name='Tuck Jumps',
        instructions='Stand with your feet shoulder-width apart. Jump as high as you can while bringing your knees towards your chest. Land softly and immediately jump again.',
        musclegroup='Cardio',
        equipment='None',
        sets=4,
        reps='10'
    )
    db.session.add(arms)
    db.session.add(arm1)
    db.session.add(arm2)
    db.session.add(arm3)
    db.session.add(arm4)
    db.session.add(arm5)
    db.session.add(arm6)
    db.session.add(arms7)
    db.session.add(arms8)
    db.session.add(arms9)
    db.session.add(shoulder)
    db.session.add(shoulder1)
    db.session.add(shoulder2)
    db.session.add(shoulder3)
    db.session.add(shoulder4)
    db.session.add(shoulder5)
    db.session.add(shoulder6)
    db.session.add(shoulder7)
    db.session.add(shoulder8)
    db.session.add(shoulder9)
    db.session.add(chest)
    db.session.add(chest1)
    db.session.add(chest2)
    db.session.add(chest8)
    db.session.add(chest7)
    db.session.add(chest6)
    db.session.add(chest5)
    db.session.add(chest4)
    db.session.add(chest3)
    db.session.add(abdominals)
    db.session.add(abdominals1)
    db.session.add(abdominals2)
    db.session.add(abdominals3)
    db.session.add(abdominals4)
    db.session.add(abdominals5)
    db.session.add(abdominals6)
    db.session.add(abdominals7)
    db.session.add(abdominals8)
    db.session.add(abdominals9)
    db.session.add(butt)
    db.session.add(butt1)
    db.session.add(butt2)
    db.session.add(butt3)
    db.session.add(butt4)
    db.session.add(butt5)
    db.session.add(butt6)
    db.session.add(butt7)
    db.session.add(butt8)
    db.session.add(butt9)
    db.session.add(leg)
    db.session.add(leg1)
    db.session.add(leg2)
    db.session.add(leg3)
    db.session.add(leg4)
    db.session.add(leg5)
    db.session.add(leg6)
    db.session.add(leg7)
    db.session.add(leg8)
    db.session.add(leg9)
    db.session.add(cardio)
    db.session.add(cardio1)
    db.session.add(cardio2)
    db.session.add(cardio3)
    db.session.add(cardio4)
    db.session.add(cardio5)
    db.session.add(cardio6)
    db.session.add(cardio7)
    db.session.add(cardio8)
    db.session.add(cardio9)
    db.session.add(cardio10)
    db.session.add(cardio11)
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