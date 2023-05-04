import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClothsData } from 'src/app/Model/clothsData';
import { ServicesService } from 'src/Services/services.service';

@Component({
  selector: 'app-inventry',
  templateUrl: './inventry.component.html',
  styleUrls: ['./inventry.component.scss']
})
export class InventryComponent implements OnInit {

  ClothsData!: any;

  constructor(private serive: ServicesService) {
    this.ClothsData = new FormGroup({
      ptype: new FormControl('', [Validators.required]),
      pname: new FormControl('', [Validators.required]),
      Pprice: new FormControl('', [Validators.required]),
      pcolor: new FormControl('', [Validators.required]),
      pdes: new FormControl('', [Validators.required]),
      psize: new FormControl('', [Validators.required]),
      pquantity: new FormControl('', [Validators.required]),
      pimage: new FormControl('', [Validators.required]),
      scimage1: new FormControl('', [Validators.required]),
      scimage2: new FormControl('', [Validators.required]),
      scimage3: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {

  }

  AddData(data: any) {
    debugger
    if (data != null) {
      this.serive.addClothsData(data).subscribe(res => {
        var result = res;
        
      })
    }
  }
}
