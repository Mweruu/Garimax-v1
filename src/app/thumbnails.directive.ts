import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appThumbnails]'
})
export class ThumbnailsDirective {

  constructor( private element:ElementRef) { }
  @HostListener('click')
  imageChange(){
    var src = this.element.nativeElement.src;
    var preview:any = document.getElementById("preview");
    preview.src = src;
    console.log("src",src)
    console.log("preview",preview)
    var imageSlide = document.getElementsByClassName("img-slide");
    for(let i=0; i<imageSlide.length; i++){
      imageSlide[i].classList.remove("active");
    }
    this.element.nativeElement.parentElement.classList.add("active");
  }

}
