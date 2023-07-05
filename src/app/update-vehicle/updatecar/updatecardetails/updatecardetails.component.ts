import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/datastorage.service';
import { ACCELERATION, BODY_TYPE, CAR_OPTIONS, COLOR, CONDITION, DRIVETRAIN, ENGINE_POWER, ENGINE_SIZE, FUEL_TYPE, STEERING, TRANSMISSION, USAGE } from '../../../homepage/const-data/constants'
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/layout/data.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-updatecardetails',
  templateUrl: './updatecardetails.component.html',
  styleUrls: ['./updatecardetails.component.scss']
})
export class UpdatecardetailsComponent implements OnInit {
    selectedOptions: { name: string, key: string }[] = [];;
    options = CAR_OPTIONS;
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
    vehicle:any;
    currentVehicleId!:string;
    id:any;


    constructor( private ds:DataStorageService,
                private fb:FormBuilder,
                private router:Router,
                private dataService: DataService,
                private messageService:MessageService,
                private activatedRoute: ActivatedRoute
      ) { }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      if(params['vehicleId']){
        this.currentVehicleId = params['vehicleId'];
        console.log("ID:",this.currentVehicleId)
        this.ds.getVehicle(this.currentVehicleId).subscribe(vehicle => {
          this.vehicle = vehicle;
          // console.log("DATA", vehicle.images)
          console.log(vehicle.id)
          this.id = vehicle.id
        });
      }
    });
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
      // selectedOptions:[this.accessories]
    });


    }

    onBasicUploadAuto(event: any) {
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded Successfully' });
    }

    onSubmit(id: string){
      this.isSubmitted = true;
      if(this.carDetsForm.invalid){
        return;
      }else{
        this.router.navigateByUrl(`previewupdate/${id}`);
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
        accessories:this.selectedOptions.map(option => option.name)

      }
      this.dataService.setcardetailsData(details)
      console.log('Details Data!',details)

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


    onCheckboxChange() {
      const names = this.selectedOptions.map(option => option.name);
      console.log("names",names);
    }

    getVehicle(id: string){
      console.log(536747843,this.id)
      this.router.navigateByUrl(`previewupdate/${id}`);
    }

    back(id: string){
      this.router.navigateByUrl(`uploadpictureupdate/${id}`);
    }
}
