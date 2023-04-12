import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkMenuModule } from '@angular/cdk/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { ContainerComponent } from './container/container.component';
import { ItemcardComponent } from './trackcard/trackcard.component';
import { NavmenuComponent } from './navmenu/navmenu.component';

import { PlayerService } from './services/player.service';


@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        ContainerComponent,
        ItemcardComponent,
        NavmenuComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule, 
        DragDropModule, 
        CdkMenuModule
    ],
    providers: [PlayerService],
    bootstrap: [AppComponent]
})
export class AppModule { }
