import { Component } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})

export class ProfileDetailsComponent {  
  user_type: any;
  editForm!: FormGroup;
  
  constructor(private actionService: ActionService) { }

  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.user_type = userData.user_type;
    }
  }

}
