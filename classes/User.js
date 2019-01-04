"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(chatId, body, state) {
        this.chatId = '';
        this.body = '';
        this.state = '';
        this.chatId = chatId;
        this.body = body;
        this.state = state;
    }
    Object.defineProperty(User.prototype, "getChatId", {
        get: function () {
            return this.chatId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "getMessage", {
        get: function () {
            return this.body;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "getState", {
        get: function () {
            return this.state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "setChatId", {
        set: function (chatId) {
            this.chatId = chatId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "setMessage", {
        set: function (body) {
            this.body = body;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "setState", {
        set: function (state) {
            this.state = state;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
exports.User = User;
