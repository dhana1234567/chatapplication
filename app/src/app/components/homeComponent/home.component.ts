/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'

import { chatService } from '../../services/chat/chat.service';
/**
 * Service import Example :
 * import { HeroService } from '../../services/hero/hero.service';
 */

/**
* 
* Serivice Designer import Example - Service Name - HeroService
* import { HeroService } from 'app/sd-services/HeroService';
*/

@Component({
    selector: 'bh-home',
    templateUrl: './home.template.html',
    providers: [chatService]
})

export class homeComponent implements OnInit {

    user: String;
    room: String;
    messageText: String;
    messageArray: Array<{ user: String, message: String }> = [];

    constructor(private _chatService: chatService) {

        this._chatService.newUserJoined().subscribe(data => this.messageArray.push(data));
        this._chatService.userLeftRoom().subscribe(data => this.messageArray.push(data));
        this._chatService.newMessageReceived().subscribe(data => this.messageArray.push(data));

    }

    join() {
        this._chatService.joinRoom({ user: this.user, room: this.room });
    }
    leave() {
        this._chatService.leaveRoom({ user: this.user, room: this.room });
    }

    sendMessage() {
        this._chatService.sendMessage({ user: this.user, room: this.room, message: this.messageText });
    }
    ngOnInit() {

    }


}
