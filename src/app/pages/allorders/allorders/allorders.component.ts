import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order/order.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { UserOrder } from '../../../shared/interfaces/user-order';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  private readonly orderService = inject(OrderService);
  userData: any = {};
  userOrders: UserOrder[] = [];

  ngOnInit(): void {
    this.saveuserinfo();
  }

  saveuserinfo() {
    if (localStorage.getItem('token') !== null) {
      this.userData = jwtDecode(localStorage.getItem('token')!);
      // console.log(this.userData.id);
      this.getUserOrders(this.userData.id);
    }
  }
  getUserOrders(id: string): void {
    this.orderService.getUserOrders(id).subscribe({
      next: (res) => {
        // console.log(res);
        this.userOrders = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
