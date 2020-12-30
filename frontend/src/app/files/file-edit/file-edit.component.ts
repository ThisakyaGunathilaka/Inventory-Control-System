import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FileService} from '../file.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-file-edit',
  templateUrl: './file-edit.component.html',
  styleUrls: ['./file-edit.component.css']
})
export class FileEditComponent implements OnInit {
  currentImage = {id: '', title: '', path: ''};
  imageChanged = false;
  newImageUrl: any;

  editImageForm: FormGroup;

  constructor(private router: Router, private  route: ActivatedRoute, private fileService: FileService) {
  }

  ngOnInit(): void {
    this.editImageForm = new FormGroup({
      title: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      imageSource: new FormControl('', Validators.required),
    });
    const id = this.route.snapshot.params.id;
    this.fileService.getImage(+id).subscribe(
      response => {
        this.currentImage.id = response.id;
        this.currentImage.title = response.title;
        this.currentImage.path = response.path;
        this.editImageForm.patchValue({
          title: this.currentImage.title,
        });
        console.log(this.currentImage);
      }, error => {
        console.log(error);
      }
    );

  }

  onSubmit(): void {
    console.log('submitting the button');
    const uploadData = new FormData();
    uploadData.append('title', this.editImageForm.get('title').value);
    uploadData.append('file', this.editImageForm.get('imageSource').value);
    this.fileService.editImage(uploadData, this.currentImage.id).subscribe(response => {
        console.log(response);
        this.router.navigate(['files/list']);
      },
      error => {
        console.log(error);
      });
  }

  onFilechange(event): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = res => {
      this.newImageUrl = reader.result;
    };
    this.editImageForm.patchValue({
      imageSource: file
    });
    this.imageChanged = true;
  }

}
