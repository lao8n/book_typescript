"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports["default"] = null; // Force module mode
// 1. What’s the difference between a class and an interface?
/* A class can have implementations, initialized class fields, and visibility modifiers. It also generates JavaScript code, so it supports instanceof checks at runtime. A class defines both a type and a value. An interface just defines a type, doesn't generate any JavaScript code, can only contain type-level members, and can't contain use modifiers. */
// 2. When you mark a class' constructor as `private`, that means you can't instantiate or extend the class. What happens when you mark it as `protected` instead? Play around with this in your code editor, and see if you can figure it out.
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A)); // ok
var BalletFlat = /** @class */ (function () {
    function BalletFlat() {
        this.purpose = 'dancing';
    }
    return BalletFlat;
}());
var Boot = /** @class */ (function () {
    function Boot() {
        this.purpose = 'woodcutting';
    }
    return Boot;
}());
var Sneaker = /** @class */ (function () {
    function Sneaker() {
        this.purpose = 'walking';
    }
    return Sneaker;
}());
var Shoe = {
    create: function (type) {
        switch (type) {
            case 'balletFlat':
                return new BalletFlat();
            case 'boot':
                return new Boot();
            case 'sneaker':
                return new Sneaker();
        }
    }
};
Shoe.create('balletFlat'); // BalletFlat
Shoe.create('boot'); // Boot
Shoe.create('sneaker'); // Sneaker
// 4. [Hard] As an exercise, think about how you might design a typesafe builder pattern. Extend the Builder pattern Builder Pattern example from earlier in this chapter to:
// 4a. Guarantee at compile time that someone can’t call .send() before setting at least URL and method. Would it be easier to make this guarantee if you also force the user to call methods in a specific order? (Hint: what can you return instead of this?)
var RequestBuilder = /** @class */ (function () {
    function RequestBuilder() {
        this.data = null;
        this.method = null;
        this.url = null;
    }
    RequestBuilder.prototype.setMethod = function (method) {
        return new RequestBuilderWithMethod().setMethod(method).setData(this.data);
    };
    RequestBuilder.prototype.setData = function (data) {
        this.data = data;
        return this;
    };
    return RequestBuilder;
}());
var RequestBuilderWithMethod = /** @class */ (function (_super) {
    __extends(RequestBuilderWithMethod, _super);
    function RequestBuilderWithMethod() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RequestBuilderWithMethod.prototype.setMethod = function (method) {
        this.method = method;
        return this;
    };
    RequestBuilderWithMethod.prototype.setURL = function (url) {
        return new RequestBuilderWithMethodAndURL()
            .setMethod(this.method)
            .setURL(url)
            .setData(this.data);
    };
    return RequestBuilderWithMethod;
}(RequestBuilder));
var RequestBuilderWithMethodAndURL = /** @class */ (function (_super) {
    __extends(RequestBuilderWithMethodAndURL, _super);
    function RequestBuilderWithMethodAndURL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RequestBuilderWithMethodAndURL.prototype.setURL = function (url) {
        this.url = url;
        return this;
    };
    RequestBuilderWithMethodAndURL.prototype.send = function () {
        // ...
    };
    return RequestBuilderWithMethodAndURL;
}(RequestBuilderWithMethod));
new RequestBuilder()
    .setMethod('get')
    .setData({})
    .setURL('foo.com')
    .send();
var RequestBuilder2 = /** @class */ (function () {
    function RequestBuilder2() {
    }
    RequestBuilder2.prototype.setData = function (data) {
        return Object.assign(this, { data: data });
    };
    RequestBuilder2.prototype.setMethod = function (method) {
        return Object.assign(this, { method: method });
    };
    RequestBuilder2.prototype.setURL = function (url) {
        return Object.assign(this, { url: url });
    };
    RequestBuilder2.prototype.build = function () {
        return this;
    };
    return RequestBuilder2;
}());
new RequestBuilder2()
    .setData({})
    .setMethod('post') // Try removing me!
    .setURL('bar') // Try removing me!
    .build();
