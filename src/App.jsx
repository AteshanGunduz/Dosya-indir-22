import { useState } from 'react'
import './styles.css'
import TopText from './components/TopText'
import { useForm } from 'react-hook-form';

export default function App() {
  
  /* Challenge
    Dosya girişi henüz tam olarak ayarlanmadı. Göreviniz bunu aşağıdaki gibi tamamlamaktır:
  
    	1. Aşağıdaki 37. satırda yer alan <input /> elementi, zorunlu input olacak şekilde değiştirilmelidir:
        	- gerekli bir input olacak.
        	- kullanıcının aynı anda yüklemek için birden fazla dosya seçmesine izin verir. 
        	- kullanıcının yalnızca pdf, jpg, jpeg veya png dosyalarını seçmesine izin verir. 
        	- Bir sonraki gereksinimde açıklandığı şekilde bir input değişikliği tespit ettiğinde filesToUpload state'ini günceller. 
          
    	2. Kullanıcı yüklenecek dosyaları seçtiğinde, filesToUpload state'i kullanıcının seçtiği her dosya için bir nesne içeren bir array olacak şekilde güncellenmelidir. Her nesne 3 özelliğe sahip olmalıdır: fileName, fileType ve fileSize, değerleri olarak ilgili bilgilerle birlikte. Örneğin: {fileName: "example-file.jpeg", fileType: "image/jpeg", fileSize: 8752474}. 
          
    	3. "Dosya Seç" butonuna tıklayarak ve birden fazla dosya seçerek kodunuzu test edin. " Upload" butonuna tıkladığınızda, filesToUpload state array konsolundaki her nesnenin doğru bilgilerle kaydedildiğini görmelisiniz. (Bunun için kod zaten ayarlanmıştır.) 
	   
	Not: Kodunuzu test etmek için test-files klasöründeki dosyaları kullanabilirsiniz (klasördeki README.md dosyasına bakın). 
       
*/


const { register, handleSubmit, setError, formState: {errors, isSubmitting} } = useForm();
  
  const submit = async (data)=>{
    try{
      await new Promise((resovle)=> setTimeout(resovle, 1000))
      console.log(data);
  } catch (error) {
       setError("root", {message: "Nope"})
  }
  }
 

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-col items-center'>
      <TopText />

      <input {...register("uploaded", {required: "You need to upload a file",validate: (value) => { const acceptedFormats = ['jpeg',"png","jpg","pdf"];
          for (const file of value) {
            const fileExtension = file.name.split('.').pop().toLowerCase();
  
            if (!acceptedFormats.includes(fileExtension)) {
              return `Invalid file format. Only the following formats are allowed: ${acceptedFormats.join(', ')}.`;
            }
          }
            return true;
        }
      })}
      type="file"
      multiple
    />
      {errors.uploaded && <p className='text-red-600 font-semibold w-60'>{errors.uploaded.message}</p>}
      <button>Upload </button>
    </form>
  )
}

