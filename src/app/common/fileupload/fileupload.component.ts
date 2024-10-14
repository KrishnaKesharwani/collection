import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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

  // ControlValueAccessor methods
  onChange = (file: File | null) => { };
  onTouched = () => { };
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.value = file;
      this.onChange(file); // Update form control value
      this.fileChange.emit(file);
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
