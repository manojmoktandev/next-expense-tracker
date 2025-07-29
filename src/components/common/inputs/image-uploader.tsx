/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useDropzone,FileRejection } from 'react-dropzone';
import { ControllerRenderProps } from 'react-hook-form';

const MAX_FILES = 3;
const MAX_FILE_SIZE_MB = 10;
// type FileWithPreview =  File & {preview:string}
type FilePreview = {
    id: string;
    url: string;
    name: string;
    isNew: boolean;
  };
  

type ImageUploaderFieldProps  = {
    field:ControllerRenderProps<any,any>,
    fieldState : any,
    multiple?:boolean,
    maxFiles?: number;
    maxSizeMB?: number;
}

const ImageUploaderField:React.FC<ImageUploaderFieldProps> = ({ field, fieldState, multiple=false,maxFiles = 3,
    maxSizeMB = 10}) => {
  const { onChange, value } = field;
  const { error } = fieldState;

  const [files, setFiles] = useState<FilePreview[]>([]);
  const [dropError, setDropError] = useState<string | null>(null);
  const initialValueRef = useRef(value);

  // initializw files from value
  useEffect(()=>{
    const createFilePreviews =  async()=>{
        const previews:FilePreview[]= [];
        for (const item of value){
            if(typeof item ==='string') {
                //existeing url
                previews.push({
                    id:`existing-${Math.random().toString(36).substr(2,9)}`,
                    url:item,
                    name:item.split('/').pop() || 'existing.jpg',
                    isNew:false
                });
            }
            else if (item instanceof File){
                previews.push({
                    id: URL.createObjectURL(item),
                    url: URL.createObjectURL(item),
                    name: item.name,
                    isNew: true,
                })
            }
        }
        setFiles(previews);
    }
    createFilePreviews();
  },[value])

  const onDrop = useCallback(
    (acceptedFiles:File[], fileRejections:FileRejection[]) => {
      setDropError(null);

      if (fileRejections.length > 0) {
        setDropError('Some files were rejected. Please ensure they are under 10MB and valid image types.');
        return;
      }

    //   let newFiles = acceptedFiles.map(file =>
    //     Object.assign(file, {
    //       preview: URL.createObjectURL(file),
    //     })
    //   );

    //   if (!multiple) {
    //     newFiles = newFiles.slice(0, 1);
    //   }
      const availableSlots = maxFiles - files.length;
      if (availableSlots <= 0) {
        setDropError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const validFiles = acceptedFiles.slice(0,availableSlots);
      const newPreviews:FilePreview[] =  validFiles.map(file=>({
        id:URL.createObjectURL(file),
        url:URL.createObjectURL(file),
        name:file.name,
        isNew:true
      }))

      const updatePreviews = [...files, ...newPreviews];
      setFiles(updatePreviews);

    //   const combinedFiles = multiple ? [...files, ...newFiles].slice(0, MAX_FILES) : newFiles;

    //   setFiles(combinedFiles);
     // update form value : existting URLs + new files
     const existingUrls =  value.filter(item => typeof item==='string');
     const newFiles =  validFiles.map(file=>file);

     console.log('existingUrls .......', existingUrls);

      onChange([...existingUrls, ...newFiles]);
    },
    [files, multiple,onChange, value]
  );

  const removeImage = (index:string) => {
    const updatedFiles = [...files];
    const filterFiles = updatedFiles.filter((rec)=>rec.id!==index)
    const updateFilterMap =  filterFiles.map((e)=>e.url);
    // updatedFiles.splice(index, 1);
    setFiles(filterFiles);
    onChange(updateFilterMap);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple,
    accept: {
      'image/*': ['jpg','jpeg','pdf','png','gif','webp'],
    },
    maxSize: MAX_FILE_SIZE_MB * 1024 * 1024,
  });

  // Revoke data URIs to avoid memory leaks
  useEffect(() => {
    return () => {
      files.forEach(file =>{
        //if(file.isNew){
            URL.revokeObjectURL(file.url);
        //}
      });
    };
  }, [files]);

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-1 border-dashed p-6 rounded-md text-center transition-colors duration-300 cursor-pointer ${
          isDragActive ? 'bg-gray-100 border-blue-400' : 'bg-white border-gray-300'
        } ${dropError ? 'border-red-500' : ''}`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          Drag and drop image{multiple ? 's' : ''} here, or click to select
        </p>
        <p className="text-sm text-gray-400 mt-1">(Max {MAX_FILES} images, {MAX_FILE_SIZE_MB}MB each)</p>
      </div>

      {dropError && <p className="text-red-500 text-sm mt-2">{dropError}</p>}
      {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}

      {files.length > 0 && (
        <div className="flex flex-wrap mt-4 gap-4">
          {files.map((file, index) => (
            
            <div key={index} className="relative w-24 h-24 rounded overflow-hidden border">
              <Image
                height={400}
                width={400}
                src={file.url}
                alt={`Preview ${file.name}`}
                className="object-cover w-full h-full"
              />
              <button
                type="button" 
                onClick={() => removeImage(file.id)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-700"
                title="Remove"
              >
                
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploaderField;