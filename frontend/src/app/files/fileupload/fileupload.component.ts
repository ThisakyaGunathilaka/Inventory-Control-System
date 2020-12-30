import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileService} from '../file.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {
  fileUploadForm: FormGroup;
  imageAdded = false;
  imageUrl: any;

  constructor(private fileService: FileService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fileUploadForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      image: new FormControl(null, [Validators.required]),
      imageSource: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    const uploadData = new FormData();
    uploadData.append('title', this.fileUploadForm.get('title').value);
    uploadData.append('file', this.fileUploadForm.get('imageSource').value);
    this.fileService.uploadFile(uploadData).subscribe(response => {
        console.log(response);
        console.log(this.fileUploadForm.value);
        this.router.navigate(['files/list/']);
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
      this.imageUrl = reader.result;
    };
    this.fileUploadForm.patchValue({
      imageSource: file
    });
    this.imageAdded = true;
  }

}
