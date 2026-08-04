"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use((error, _req, res, next) => {
    console.error('Server error:', error);
    if (res.headersSent) {
        return next(error);
    }
    res.status(500).json({ error: 'Internal Server Error' });
});
const port = Number(process.env.PORT || 8000);
app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
    console.log(`MongoDB connection state: ${database_1.default.readyState}`);
});
//# sourceMappingURL=server.js.map