import {Component, OnInit} from '@angular/core';
import {FileService} from '../file.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  images: any;

  constructor(
    private fileService: FileService,
    private router: Router,
  ) {
  }

  getImageList(): void {
    this.fileService.getAllImages().subscribe(response => {
        this.images = response;
      }, error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.getImageList();
  }

  changeDetails(image): void {
    this.router.navigate(['file/', image.id, 'edit']);
  }

  deleteImage(image): void {
    if (confirm('Are you sure want to Delete ' + image.title + ' ?')) {
      this.fileService.deleteImage(image.id).subscribe(response => {
        console.log(response);
        this.getImageList();
      }, error => {
        console.log(error);
      });
    }
  }

}
