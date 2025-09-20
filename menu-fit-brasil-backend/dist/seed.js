"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var mcDonalds, subway, user1, user2, coupon1, coupon2, nutritionist1, nutritionist2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.restaurant.create({
                        data: {
                            name: "McDonald's",
                            meals: {
                                create: [
                                    { name: "McWrap de Frango Grelhado", calories: 350 },
                                    { name: "Salada Premium", calories: 150 },
                                ],
                            },
                        },
                    })];
                case 1:
                    mcDonalds = _a.sent();
                    return [4 /*yield*/, prisma.restaurant.create({
                            data: {
                                name: "Subway",
                                meals: {
                                    create: [
                                        { name: "Sub Frango Grelhado 15cm", calories: 320 },
                                        { name: "Salada de Atum", calories: 210 },
                                    ],
                                },
                            },
                        })];
                case 2:
                    subway = _a.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: { name: "João", email: "joao@example.com", level: 3 },
                        })];
                case 3:
                    user1 = _a.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: { name: "Maria", email: "maria@example.com", level: 2 },
                        })];
                case 4:
                    user2 = _a.sent();
                    // ----------------- MEDALHAS -----------------
                    return [4 /*yield*/, prisma.medal.createMany({
                            data: [
                                { name: "Primeira Refeição", userId: user1.id, icon: "🏅" },
                                { name: "1000 Calorias Queimadas", userId: user1.id, icon: "🔥" },
                                { name: "Primeira Refeição", userId: user2.id, icon: "🏅" },
                            ],
                        })];
                case 5:
                    // ----------------- MEDALHAS -----------------
                    _a.sent();
                    return [4 /*yield*/, prisma.coupon.create({
                            data: { code: "DESC10", discount: 10, validUntil: new Date("2025-12-31") },
                        })];
                case 6:
                    coupon1 = _a.sent();
                    return [4 /*yield*/, prisma.coupon.create({
                            data: { code: "DESC20", discount: 20, validUntil: new Date("2025-12-31") },
                        })];
                case 7:
                    coupon2 = _a.sent();
                    return [4 /*yield*/, prisma.user.update({
                            where: { id: user1.id },
                            data: { coupons: { connect: [{ id: coupon1.id }, { id: coupon2.id }] } },
                        })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.update({
                            where: { id: user2.id },
                            data: { coupons: { connect: [{ id: coupon1.id }] } },
                        })];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, prisma.nutritionist.create({
                            data: { name: "Ana Nutri", email: "ana@nutri.com" },
                        })];
                case 10:
                    nutritionist1 = _a.sent();
                    return [4 /*yield*/, prisma.nutritionist.create({
                            data: { name: "Carlos Nutri", email: "carlos@nutri.com" },
                        })];
                case 11:
                    nutritionist2 = _a.sent();
                    // ----------------- DIETAS -----------------
                    return [4 /*yield*/, prisma.diet.createMany({
                            data: [
                                { title: "Dieta Low Carb", description: "Reduz carboidratos", nutritionistId: nutritionist1.id },
                                { title: "Dieta Vegana", description: "Sem produtos de origem animal", nutritionistId: nutritionist2.id },
                                { title: "Dieta Balanceada", description: "Equilibrada em macros", nutritionistId: nutritionist1.id },
                            ],
                        })];
                case 12:
                    // ----------------- DIETAS -----------------
                    _a.sent();
                    console.log("🌱 Seed finalizado com sucesso!");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return prisma.$disconnect(); })
    .catch(function (e) {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});
