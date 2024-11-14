/*Upload presets = react-native
cloud name = dctyfnwao
*/
export const uploadImageCloudinary = async(imageUri: string): Promise<string | null> => {
  const cloudName = "dctyfnwao";
  const uploadPreset = "react-native";

  const formData = new FormData();

  formData.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "upload.jpg"
  } as any );

  formData.append("upload_preset", uploadPreset);
  try {
    const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData
    });
    const data = await cloudinaryResponse.json();
    if(data.secure_url) {
      return data.secure_url;
    } else {
      console.error("Error al subir la imagen", data);
      return null;
    }

  } catch (error) {
    console.error("Error en la solicitud de Cloudinary", error);
    return null;
  }
  
};