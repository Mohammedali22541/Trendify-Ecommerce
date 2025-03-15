import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddressService } from '../../../../../core/services/address/address.service';

@Component({
  selector: 'app-addressform',
  imports: [ReactiveFormsModule],
  templateUrl: './addressform.component.html',
  styleUrl: './addressform.component.scss',
})
export class AddressformComponent {
  private readonly addressService = inject(AddressService);

  // addAddress(): void {
  //   this.addressService.addAddress(submitAddressForm.value).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
}
