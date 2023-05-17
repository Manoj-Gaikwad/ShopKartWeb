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

  ClothsData!:any;
  isClothsData=true;
  ShoesData!:any;
  isShoesData=false;
  CosmeticsData!:any;
  isCosmeticsData=false;
  clothspath!:any;
  shoespath!:any;
  cometicspath!:any


  constructor(private serive: ServicesService) {

     // Formgroup of ClothsData
    this.ClothsData = new FormGroup({
      ptype: new FormControl('Cloths', [Validators.required]),
      pstype: new FormControl('', [Validators.required]),
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

      // Formgroup of ShoesData
    this.ShoesData = new FormGroup({
      ptype: new FormControl('shoes/sandals', [Validators.required]),
      pstype: new FormControl('', [Validators.required]),
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

    // Formgroup of CosmeticData
    this.CosmeticsData = new FormGroup({
      ptype: new FormControl('Cosmetics', [Validators.required]),
      pstype: new FormControl('', [Validators.required]),
      pname: new FormControl('', [Validators.required]),
      Pprice: new FormControl('', [Validators.required]),
      pcolor: new FormControl('', [Validators.required]),
      pdes: new FormControl('', [Validators.required]),
      pquantity: new FormControl('', [Validators.required]),
      pimage: new FormControl('', [Validators.required]),
    })

    this.clothspath="../../assets/images/";
    this.shoespath="../../assets/shoes-images/"
    this.cometicspath="../../assets/cometics-images/"
  }

  ngOnInit(): void {

  }

  AddClothsData(data: any) {
    if (data != null) {
      data.value.pimage =data.value.pimage.replace("C:\\fakepath\\", "");
      data.value.scimage1=data.value.scimage1.replace("C:\\fakepath\\", "");
      data.value.scimage2=data.value.scimage2.replace("C:\\fakepath\\", "");
      data.value.scimage3=data.value.scimage3.replace("C:\\fakepath\\", "");
      data.value.pimage=this.clothspath+data.value.pimage;
      data.value.scimage1=this.clothspath+data.value.scimage1;
      data.value.scimage2=this.clothspath+data.value.scimage2;
      data.value.scimage3=this.clothspath+data.value.scimage3;
      this.serive.addClothsData(data.value).subscribe(res => {
        var result = res;
        
      })
    }
  }


  addShoesData(data:any)
  {
    if (data != null) {
      data.value.pimage =data.value.pimage.replace("C:\\fakepath\\", "");
      data.value.scimage1=data.value.scimage1.replace("C:\\fakepath\\", "");
      data.value.scimage2=data.value.scimage2.replace("C:\\fakepath\\", "");
      data.value.scimage3=data.value.scimage3.replace("C:\\fakepath\\", "");
      data.value.pimage=this.shoespath+data.value.pimage;
      data.value.scimage1=this.shoespath+data.value.scimage1;
      data.value.scimage2=this.shoespath+data.value.scimage2;
      data.value.scimage3=this.shoespath+data.value.scimage3;
      this.serive.addShoesData(data.value).subscribe(res => {
        var result = res;
      })
    }
  }


  addCosmeticsData(data:any)
  {
    if (data != null) {
      data.value.pimage =data.value.pimage.replace("C:\\fakepath\\", "");
      data.value.pimage=this.cometicspath+data.value.pimage;
      data.value.scimage1=this.cometicspath+data.value.scimage1;
      data.value.scimage2=this.cometicspath+data.value.scimage2;
      data.value.scimage3=this.cometicspath+data.value.scimage3;
      this.serive.addCosmeticsData(data.value).subscribe(res => {
        var result = res;
      })
    }
  }


checkData(event:any)
{
 var res=event.target.value;
 if(res=='Shoes/sandals')
 {
  this.isShoesData=true;
  this.isClothsData=false;
  this.isCosmeticsData=false;
 }
 else if(res=='Cosmetics')
 {
  this.isCosmeticsData=true;
  this.isClothsData=false;
  this.isShoesData=false;
 }
 else{
  this.isClothsData=true;
  this.isShoesData=false;
  this.isCosmeticsData=false;
 }
}

}
