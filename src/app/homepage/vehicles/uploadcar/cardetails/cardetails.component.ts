import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/datastorage.service';
import { ACCELERATION, BODY_TYPE, CAR_OPTIONS, COLOR, CONDITION, DRIVETRAIN, ENGINE_POWER, ENGINE_SIZE, FUEL_TYPE, STEERING, TRANSMISSION, USAGE } from '../../../const-data/constants'
import { Router } from '@angular/router';
import { DataService } from 'src/app/layout/data.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.scss']
})
export class CardetailsComponent implements OnInit {
    // selectedOptions: string[] = [];;
    options: any[] = CAR_OPTIONS;
    color: any = COLOR;
    fuelType:any = FUEL_TYPE;
    bodyType:any = BODY_TYPE;
    engineSize:any = ENGINE_SIZE;
    steering:any = STEERING;
    driveTrain:any = DRIVETRAIN;
    usage:any = USAGE;
    enginePower:any = ENGINE_POWER;
    acceleration:any = ACCELERATION;
    carDetsForm!: FormGroup;
    isSubmitted = false;
    vendor:any;
    visible!: boolean;
    myForm!: FormGroup;
    duty = [{"duty":"paid"},{"duty":"not paid"}]
    condition:any = CONDITION;
    accessories:any =[];

    constructor( private ds:DataStorageService,
                private fb:FormBuilder,
                private router:Router,
                private dataService: DataService,
                private messageService:MessageService,
      ) { }

  ngOnInit(){
    this.carDetsForm = this.fb.group({
      fuelType:['', Validators.required],
      bodyType:['', Validators.required],
      color:['', Validators.required],
      steering:['', Validators.required],
      engineSize:['', Validators.required],
      enginePower:['', Validators.required],
      acceleration:[''],
      // driveTrain:['',Validators.required],
      vinNumber:[''],
      usage:['', Validators.required],
      description:['', Validators.required],
      duty:['', Validators.required],
      condition:['', Validators.required],
      selectedOptions:[[]]
    });

    const formData = localStorage.getItem('formData');
    if (formData !== null) {
      this.carDetsForm.patchValue(JSON.parse(formData));
    }

    }
    onBasicUploadAuto(event: any) {
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded Successfully' });
  }

    onSubmit(){
      this.isSubmitted = true;
      if(this.carDetsForm.invalid){
        return;
      }else{
        this.router.navigate(['/preview'])
      }

      const details = {
        fuelType:this.carDetails['fuelType'].value,
        bodyType:this.carDetails['bodyType'].value,
        color:this.carDetails['color'].value,
        steering:this.carDetails['steering'].value,
        engineSize:this.carDetails['engineSize'].value,
        enginePower:this.carDetails['enginePower'].value,
        vinNumber:this.carDetails['vinNumber'].value,
        usage:this.carDetails['usage'].value,
        duty:this.carDetails['duty'].value,
        condition:this.carDetails['condition'].value,
        acceleration:this.carDetails['acceleration'].value,
        description:this.carDetails['description'].value,
        accessories:this.carDetails['selectedOptions'].value

      }
      this.dataService.setcardetailsData(details)
      console.log('Details Data!',details)
      localStorage.setItem('formData', JSON.stringify(this.carDetsForm.value));

    }

    showDialog() {
        this.visible = true;
    }
    onReset(){
        //Set first index to 0
        // this.firstIndex = 0;
    }

    get carDetails(){
      return this.carDetsForm.controls;
    }


    // onCheckboxChange(event:any) {
    //   const options = this.options;
    //   console.log(45546565,options);
    //   options.forEach(option => {
    //     console.log(option.name)
    //   });
    //   const selectedOptions = Array.from(options).filter(checkbox =>(checkbox as HTMLInputElement).value);
    //   // this.selectedOptions = this.accessories
    //     console.log(4554,selectedOptions);
    //   // const selectedOptions = this.options.filter((option: any) => option.selected);
    // }

    onCheckboxChange(event:any) {
      // const selectedOptions = this.carDetsForm.get('selectedOptions')?.value;
      // const options = this.options;
      // const selectedOption = Array.from(options).filter(checkbox =>(checkbox as HTMLInputElement).value);
      // console.log('Selected Options:', selectedOptions);
      // if(selectedOptions){
      //   console.log('checkbox', selectedOption, 'is checked');
      // }
      // else{
      //   console.log('checkbox is unchecked');
      // }
      console.log(event.target.checked)

    }

}
