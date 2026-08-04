"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModel = exports.LeaderboardEntryModel = exports.ActivityModel = exports.TeamModel = exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    points: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    teamId: { type: String }
});
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    coach: { type: String, required: true },
    members: { type: [String], default: [] },
    points: { type: Number, default: 0 }
});
const activitySchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number },
    calories: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
});
const leaderboardSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, default: 0 },
    streak: { type: Number, default: 0 }
});
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    focus: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, enum: ['easy', 'moderate', 'challenging'], required: true },
    equipment: { type: [String], default: [] }
});
exports.UserModel = mongoose_1.default.model('User', userSchema);
exports.TeamModel = mongoose_1.default.model('Team', teamSchema);
exports.ActivityModel = mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntryModel = mongoose_1.default.model('LeaderboardEntry', leaderboardSchema);
exports.WorkoutModel = mongoose_1.default.model('Workout', workoutSchema);
//# sourceMappingURL=models.js.map