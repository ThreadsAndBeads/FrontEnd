import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../model/file-handler.model';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {
  @Output() files :EventEmitter<FileHandle> = new EventEmitter();
  @HostBinding("style.background") private background = "#eee"; 
  constructor(private sanitizer : DomSanitizer) { }


  @HostListener("dragover", ["$event"])
  public ondragover(evt : DragEvent){

    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#999"
  }
  @HostListener("dragleave", ["$event"])
  public ondragleave(evt : DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee"

  }
  @HostListener("drop", ["$event"])
  public ondrop(evt : DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee"
    let fileHandle : FileHandle  ; 
    const file = evt.dataTransfer?.files[0] ;
    const url =  this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file!));
    fileHandle = {file , url} ; 
    this.files.emit(fileHandle);
  }
}
