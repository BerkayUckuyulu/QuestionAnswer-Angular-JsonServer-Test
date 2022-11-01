import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css'],
})
export class AnswersComponent implements OnInit {
  solutionText: string = '';
  questionId: any;
  questionObj: any;

  constructor(
    public questionService: QuestionService,
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionId = this.route.snapshot.paramMap.get('questionid');
    this.questionService
      .getQuestionById(this.questionId)
      .subscribe((response) => (this.questionObj = response));
  }

  postAnswer() {
    let solutionObj = {
      userName: this.userService.user.userName,
      solution: this.solutionText,
      plus: [],
      minus: [],
    };
    this.questionObj.solutions.push(solutionObj);

    this.questionService
      .updateQuestion(this.questionObj)
      .subscribe((response) => {
        console.log(response);
        debugger;
        this.solutionText = '';
      });
  }
  returnBack() {
    this.router.navigateByUrl('/home');
  }
  vote(index: number, point: number) {
    if (point == 1) {
      if (
        this.questionObj.solutions[index].plus.indexOf(
          this.userService.user.id
        ) == -1
      ) {
        this.questionObj.solutions[index].plus.push(this.userService.user.id);
        if (
          this.questionObj.solutions[index].minus.indexOf(
            this.userService.user.id
          ) != -1
        ) {
          let minusIndex = this.questionObj.solutions[index].minus.indexOf(
            this.userService.user.id
          );
          this.questionObj.solutions[index].minus.splice(minusIndex, 1);
        }
      }
    } else {
      if (
        this.questionObj.solutions[index].minus.indexOf(
          this.userService.user.id
        ) == -1
      ) {
        this.questionObj.solutions[index].minus.push(this.userService.user.id);
        if (
          this.questionObj.solutions[index].plus.indexOf(
            this.userService.user.id
          ) != -1
        ) {
          let plusIndex = this.questionObj.solutions[index].plus.indexOf(
            this.userService.user.id
          );
          this.questionObj.solutions[index].plus.splice(plusIndex, 1);
        }
      }
    }

    this.questionService
      .updateQuestion(this.questionObj)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
