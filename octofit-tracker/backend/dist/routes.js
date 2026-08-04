"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("./models");
const router = (0, express_1.Router)();
const fallbackUsers = [
    { _id: 'user-1', name: 'Maya', email: 'maya@example.com', age: 16, level: 'intermediate', points: 180, streak: 5, teamId: 'team-1' },
    { _id: 'user-2', name: 'Liam', email: 'liam@example.com', age: 15, level: 'beginner', points: 120, streak: 3, teamId: 'team-2' }
];
const fallbackTeams = [
    { _id: 'team-1', name: 'Storm Squad', coach: 'Coach Rivera', members: ['user-1'], points: 220 },
    { _id: 'team-2', name: 'Trail Blazers', coach: 'Coach Patel', members: ['user-2'], points: 180 }
];
const fallbackActivities = [
    { _id: 'activity-1', userId: 'user-1', type: 'run', duration: 30, distance: 4.2, calories: 280, date: new Date('2026-08-01') },
    { _id: 'activity-2', userId: 'user-2', type: 'walk', duration: 45, distance: 3.5, calories: 180, date: new Date('2026-08-02') }
];
const fallbackLeaderboards = [
    { _id: 'leaderboard-1', userName: 'Maya', teamName: 'Storm Squad', points: 180, streak: 5 },
    { _id: 'leaderboard-2', userName: 'Liam', teamName: 'Trail Blazers', points: 120, streak: 3 }
];
const fallbackWorkouts = [
    { _id: 'workout-1', title: 'Speed Intervals', focus: 'cardio', duration: 20, difficulty: 'moderate', equipment: ['timer'] },
    { _id: 'workout-2', title: 'Core Strength', focus: 'strength', duration: 25, difficulty: 'easy', equipment: ['mat'] }
];
async function withMongo(operation, fallback) {
    try {
        return await operation();
    }
    catch (error) {
        console.warn('MongoDB operation failed, using fallback data:', error);
        return fallback;
    }
}
router.get('/api/health', (_req, res) => {
    const codespaceName = process.env.CODESPACE_NAME;
    const baseUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
    res.json({ status: 'ok', service: 'octofit-tracker-backend', baseUrl });
});
router.get('/api/users', async (_req, res) => {
    const users = await withMongo(() => models_1.UserModel.find().lean().exec(), fallbackUsers);
    res.json(users);
});
router.get('/api/teams', async (_req, res) => {
    const teams = await withMongo(() => models_1.TeamModel.find().lean().exec(), fallbackTeams);
    res.json(teams);
});
router.get('/api/activities', async (_req, res) => {
    const activities = await withMongo(() => models_1.ActivityModel.find().sort({ date: -1 }).lean().exec(), fallbackActivities);
    res.json(activities);
});
router.get('/api/leaderboard', async (_req, res) => {
    const entries = await withMongo(() => models_1.LeaderboardEntryModel.find().sort({ points: -1 }).lean().exec(), fallbackLeaderboards);
    res.json(entries);
});
router.get('/api/workouts', async (_req, res) => {
    const workouts = await withMongo(() => models_1.WorkoutModel.find().lean().exec(), fallbackWorkouts);
    res.json(workouts);
});
router.post('/api/users', async (req, res) => {
    const user = new models_1.UserModel(req.body);
    try {
        const saved = await user.save();
        res.status(201).json(saved);
    }
    catch (error) {
        console.warn('Unable to save user, returning fallback response', error);
        res.status(201).json({ ...req.body, _id: `user-${Date.now()}` });
    }
});
router.post('/api/activities', async (req, res) => {
    const activity = new models_1.ActivityModel(req.body);
    try {
        const saved = await activity.save();
        res.status(201).json(saved);
    }
    catch (error) {
        console.warn('Unable to save activity, returning fallback response', error);
        res.status(201).json({ ...req.body, _id: `activity-${Date.now()}` });
    }
});
exports.default = router;
//# sourceMappingURL=routes.js.map