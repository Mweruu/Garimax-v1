import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/datastorage.service';
import { ACCELERATION, BODY_TYPE, CAR_OPTIONS, COLOR, CONDITION, DRIVETRAIN, ENGINE_POWER, ENGINE_SIZE, FUEL_TYPE, STEERING, TRANSMISSION, USAGE } from '../../../const-data/constants'
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/layout/data.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.scss']
})
export class CardetailsComponent implements OnInit {
    selectedOptions: {select:boolean, name: string,}[] = [];
    // selectedOptions: { name: string, key: string }[] = [];
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
    updateMode = false;
    accessories3 =[ {select:false, name:'Box Truck'},
                    {select:true, name:'Bench Seat'},
                    {select:false, name: 'Back Tire'},
                    {select:true, name:'Back Camera'},
                    {select:false, name: 'Around View Camera'},
                    {select:false, name:'Alloy Wheels'},
                    {select:true, name:'AM/FM'}
                  ]

    constructor( private ds:DataStorageService,
                private fb:FormBuilder,
                private router:Router,
                private dataService: DataService,
                private messageService:MessageService,
                private activatedRoute: ActivatedRoute
      ) { }

  ngOnInit(){
    this._checkUpdateMode()
    // this.onCheckboxChange()

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
      duty:[''],
      condition:['', Validators.required],
      // selectedOptions:[this.accessories]
    });

    }

    onBasicUploadAuto(event: any) {
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded Successfully' });
    }

    onSubmit(){
      this.isSubmitted = true;
      if(this.carDetsForm.invalid){
        return;
      }else{
        // this.router.navigate(['/preview'])
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

      if(this.updateMode){
        this._updateInfo(this.id,details)
      }else{
        this._createInfo(details)
      }


    }

    private _updateInfo(id: string,details:any){
      this.dataService.setcardetailsData(details)
      console.log('Details Data updated' ,details);
      this.router.navigate([`/uploadcar/preview/${id}`])

    }

    private _createInfo(details:any){
      this.dataService.setcardetailsData(details)
      console.log('Details Data!',details)
      this.router.navigate([`/uploadcar/preview`])

    }

    showDialog() {
        this.visible = true;
    }

    private _checkUpdateMode(){
      this.activatedRoute.params.subscribe(params => {
        if(params['vehicleId']){
          this.updateMode = true
          this.currentVehicleId = params['vehicleId'];
          console.log("ID:",this.currentVehicleId)
          this.ds.getVehicle(this.currentVehicleId).subscribe(vehicle => {
            this.vehicle = vehicle;
            // console.log("DATA", vehicle.images)
            console.log(vehicle.id, vehicle)
            // this.selectedOptions = vehicle.accessories[0]
            // console.log(this.selectedOptions)
            const selectedAccessories = vehicle.accessories[0].map((accessory: any, index: number) => {
              if (index === 0) {
                return null; // Skip the empty string at the beginning of the array
              }
              return { select: true, name: accessory };
            }).filter((accessory: null) => accessory !== null);
            this.selectedOptions =selectedAccessories
            console.log("options",this.selectedOptions)
            this.id = vehicle.id

            this.carDetails['fuelType'].setValue(vehicle.fuelType)
            this.carDetails['bodyType'].setValue(vehicle.bodyType)
            this.carDetails['color'].setValue(vehicle.color)
            this.carDetails['steering'].setValue(vehicle.steering)
            this.carDetails['engineSize'].setValue(vehicle.engineSize)
            this.carDetails['enginePower'].setValue(vehicle.enginePower)
            this.carDetails['vinNumber'].setValue(vehicle.vinNumber)
            this.carDetails['usage'].setValue(vehicle.usage)
            this.carDetails['duty'].setValue(vehicle.duty)
            this.carDetails['condition'].setValue(vehicle.condition)
            this.carDetails['acceleration'].setValue(vehicle.acceleration)
            this.carDetails['description'].setValue(vehicle.description)
            // this.carDetails['accessories'].setValue(vehicle.accessories)
          });
        }
      });
    }

    isSelected(option: any): boolean {
      return this.selectedOptions.some((selectedOption) => selectedOption.name === option.name);
    }

    onCheckboxChange(event: any, option: any): void {
      if (event) {
        // If the checkbox is checked, add the option to selectedOptions.
        console.log(this.selectedOptions)
        const names = this.selectedOptions.map(option => option.name);
        console.log("names",names);
      } else {
        // If the checkbox is unchecked, remove the option from selectedOptions.
        this.selectedOptions = this.selectedOptions.filter((selectedOption) => selectedOption.name !== option.name);
      }
    }

    get carDetails(){
      return this.carDetsForm.controls;
    }
}
