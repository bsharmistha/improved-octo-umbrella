"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with starter test data for users, teams,
 * activities, leaderboard entries, and workouts.
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            models_1.ActivityModel.deleteMany({}),
            models_1.LeaderboardEntryModel.deleteMany({}),
            models_1.TeamModel.deleteMany({}),
            models_1.UserModel.deleteMany({}),
            models_1.WorkoutModel.deleteMany({})
        ]);
        const teams = await models_1.TeamModel.insertMany([
            { name: 'Storm Squad', coach: 'Coach Rivera', members: [], points: 220 },
            { name: 'Trail Blazers', coach: 'Coach Patel', members: [], points: 180 },
            { name: 'Peak Performers', coach: 'Coach Chen', members: [], points: 160 }
        ]);
        const users = await models_1.UserModel.insertMany([
            { name: 'Maya', email: 'maya@example.com', age: 16, level: 'intermediate', points: 180, streak: 5, teamId: teams[0]._id.toString() },
            { name: 'Liam', email: 'liam@example.com', age: 15, level: 'beginner', points: 120, streak: 3, teamId: teams[1]._id.toString() },
            { name: 'Sofia', email: 'sofia@example.com', age: 17, level: 'advanced', points: 240, streak: 7, teamId: teams[0]._id.toString() },
            { name: 'Noah', email: 'noah@example.com', age: 16, level: 'intermediate', points: 150, streak: 4, teamId: teams[2]._id.toString() }
        ]);
        const teamMembers = users.reduce((accumulator, user) => {
            const teamId = user.teamId ?? '';
            if (!accumulator[teamId]) {
                accumulator[teamId] = [];
            }
            accumulator[teamId].push(user._id.toString());
            return accumulator;
        }, {});
        for (const team of teams) {
            await models_1.TeamModel.updateOne({ _id: team._id }, { $set: { members: teamMembers[team._id.toString()] ?? [] } });
        }
        await models_1.ActivityModel.insertMany([
            { userId: users[0]._id.toString(), type: 'run', duration: 30, distance: 4.2, calories: 280, date: new Date('2026-08-01') },
            { userId: users[1]._id.toString(), type: 'walk', duration: 45, distance: 3.5, calories: 180, date: new Date('2026-08-02') },
            { userId: users[2]._id.toString(), type: 'strength', duration: 25, calories: 320, date: new Date('2026-08-03') },
            { userId: users[3]._id.toString(), type: 'cycle', duration: 40, distance: 12.6, calories: 360, date: new Date('2026-08-04') }
        ]);
        await models_1.LeaderboardEntryModel.insertMany([
            { userName: 'Sofia', teamName: 'Storm Squad', points: 240, streak: 7 },
            { userName: 'Maya', teamName: 'Storm Squad', points: 180, streak: 5 },
            { userName: 'Noah', teamName: 'Peak Performers', points: 150, streak: 4 },
            { userName: 'Liam', teamName: 'Trail Blazers', points: 120, streak: 3 }
        ]);
        await models_1.WorkoutModel.insertMany([
            { title: 'Speed Intervals', focus: 'cardio', duration: 20, difficulty: 'moderate', equipment: ['timer'] },
            { title: 'Core Strength', focus: 'strength', duration: 25, difficulty: 'easy', equipment: ['mat'] },
            { title: 'Hill Repeats', focus: 'endurance', duration: 35, difficulty: 'challenging', equipment: ['water bottle'] }
        ]);
        console.log('Database seeding complete');
    }
    finally {
        await mongoose_1.default.disconnect();
    }
}
seedDatabase().catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map