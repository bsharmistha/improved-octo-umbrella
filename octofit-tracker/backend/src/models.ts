import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  streak: number;
  teamId?: string;
}

export interface ITeam extends Document {
  name: string;
  coach: string;
  members: string[];
  points: number;
}

export interface IActivity extends Document {
  userId: string;
  type: string;
  duration: number;
  distance?: number;
  calories: number;
  date: Date;
}

export interface ILeaderboardEntry extends Document {
  userName: string;
  teamName: string;
  points: number;
  streak: number;
}

export interface IWorkout extends Document {
  title: string;
  focus: string;
  duration: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  equipment: string[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  points: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  teamId: { type: String }
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  coach: { type: String, required: true },
  members: { type: [String], default: [] },
  points: { type: Number, default: 0 }
});

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  distance: { type: Number },
  calories: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userName: { type: String, required: true },
  teamName: { type: String, required: true },
  points: { type: Number, default: 0 },
  streak: { type: Number, default: 0 }
});

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  focus: { type: String, required: true },
  duration: { type: Number, required: true },
  difficulty: { type: String, enum: ['easy', 'moderate', 'challenging'], required: true },
  equipment: { type: [String], default: [] }
});

export const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export const TeamModel: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);
export const ActivityModel: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntryModel: Model<ILeaderboardEntry> = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const WorkoutModel: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);
