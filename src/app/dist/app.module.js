"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/common/http");
var app_component_1 = require("./app.component");
var layouts_1 = require("./layouts");
var components_1 = require("./shared/components");
var services_1 = require("./shared/services");
var unauthenticated_content_1 = require("./unauthenticated-content");
var _shared_1 = require("@shared");
var app_routing_module_1 = require("./app-routing.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                layouts_1.SideNavOuterToolbarModule,
                layouts_1.SideNavInnerToolbarModule,
                layouts_1.SingleCardModule,
                components_1.FooterModule,
                components_1.ResetPasswordFormModule,
                components_1.CreateAccountFormModule,
                components_1.ChangePasswordFormModule,
                components_1.LoginFormModule,
                unauthenticated_content_1.UnauthenticatedContentModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
            ],
            providers: [services_1.AuthService, services_1.ScreenService, services_1.AppInfoService, _shared_1.oDataService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
