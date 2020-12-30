import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FileService} from '../file.service';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit {
  image = {
    id: '',
    title: '',
    path: '',
  };

  constructor(private router: Router,
              private  route: ActivatedRoute,
              private fileService: FileService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.fileService.getImage(+id).subscribe(response => {
        this.image.id = response.id;
        this.image.title = response.title;
        this.image.path = response.path;
      }, error => {
        console.log(error);
      }
    );
  }
  goToEdit(): void {
    const id = this.route.snapshot.params.id;
    this.router.navigate(['file/', this.image.id, 'edit']);
  }

  deleteImage(image): void {
    if (confirm('Are you sure want to Delete ' + image.title + ' ?')) {
      this.fileService.deleteImage(image.id).subscribe(response => {
        console.log(response);
        this.router.navigate(['files/list']);
      }, error => {
        console.log(error);
      });
    }
  }

}
