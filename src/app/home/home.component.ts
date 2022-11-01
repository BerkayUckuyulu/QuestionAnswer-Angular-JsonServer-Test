import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  question: string = '';
  questionList: Array<any> = [];

  constructor(
    public questionService: QuestionService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe((response) => {
      this.questionList = response;
    });
  }
  post() {
    this.questionService
      .postQuestions({
        userName: this.userService.user.userName,
        question: this.question,
        solutions: [],
      })
      .subscribe((response) => {
        this.questionList.push(response);
      });
  }
}
