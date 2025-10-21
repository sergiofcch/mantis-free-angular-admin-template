import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ /* tus componentes */],
    imports: [
        // otros módulos
        HttpClientModule,
        FormsModule, 
        BrowserAnimationsModule, 
        BrowserModule,
        RouterModule, 
        ReactiveFormsModule
    ],
    exports: [
        HttpClientModule,
        FormsModule, 
        BrowserAnimationsModule, 
        BrowserModule,
        RouterModule, 
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [/* componente principal */]
})
export class AppModule { }
