import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  projectStatuses = ['Stable', 'Critical', 'Finished'];

  constructor(formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectData': new FormGroup({
        'projectName': new FormControl(null,
          [Validators.required,
          this.forbiddenProjectName]
        ),
        'projectEmail': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailAddress)
      }),
      'projectStatus': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.projectForm);
    console.log('On Submit');
  }

  forbiddenProjectName(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'Test') {
      return {'projectIsForbidden': true};
    }
    return null;
  }

  forbiddenEmailAddress(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve( null);
        }
      }, 1000);
    });
  }
}
