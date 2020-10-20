import { Component, EventEmitter, Output } from '@angular/core';
import {LoggingService} from '../logging.service';
import {AccountsService} from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService]
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{name: string, status: string}>();
  constructor(private logginService: LoggingService, private accountService: AccountsService) {
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus
    });
    this.accountService.statusUpdated.subscribe(
      (status: string) => alert('New Status: ' + status)
    );
    this.accountService.addAccount(accountName, accountStatus);
    console.log('A server status changed, new status: ' + accountStatus);
  }
}
