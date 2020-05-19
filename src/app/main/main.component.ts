import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/interfaces/post.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
obj:{}
  constructor() { }

  ngOnInit() {
  }


  sendObj(obj: Post) {
    this.obj = obj;
    console.log(this.obj)
  }
}
