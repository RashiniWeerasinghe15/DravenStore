import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export async function uploadProductImage(
  file: File,
  productSlug: string
): Promise<string> {
  const filename = `${productSlug}-${Date.now()}-${file.name}`;
  const storageRef = ref(storage, `products/${filename}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}