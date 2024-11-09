import { Component, EventEmitter, forwardRef, Input, Output, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DynamicWidthDirective } from '../directive/dynamic-width.directive';
import { CommonComponentsModule } from '../common-components.module';
@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileuploadComponent),
      multi: true
    }
  ]
})
export class FileuploadComponent {
  @Output() fileChange = new EventEmitter<File | null>();
  value: File | null = null;
  @Input() accept: any;
  @Input() uploadType: any = 'file';
  @Input() imageSize: any;
  @Input() imageCaption: any;
  @Input() imageUrl: string | undefined;
  @Output() image_base16String: string | ArrayBuffer | null = null;
  @Input() form!: FormGroup;
  // @Output() fileChange = new EventEmitter<string | ArrayBuffer | null>();
  // ControlValueAccessor methods
  onChange = (file: File | null) => { };
  onTouched = () => { };

  get imageSrc(): string {
    return this.imageUrl || '../../../assets/imgs/default-pic.png';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.value = file;
      this.onChange(file); // Update form control value
      this.fileChange.emit(file);
      // Buffer Code
      const reader = new FileReader();
      reader.onload = e => {
        this.image_base16String = reader.result; // Set imageSrc to the base64 data
        this.form.controls['image'].setValue(reader.result);
      };
      reader.readAsDataURL(file);
      // this.fileChange.emit(this.image_base16File);
    } else {
      this.value = null;
      this.onChange(null); // Clear form control value
      this.fileChange.emit(null);
    }
  }

  writeValue(file: File | null): void {
    this.value = file;
  }

  registerOnChange(fn: (file: File | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
