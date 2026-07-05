import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product, Gender } from "@/lib/types";

const PRODUCTS_COL = "products";

export async function getAllProducts(): Promise<Product[]> {
  const snap = await getDocs(collection(db, PRODUCTS_COL));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

export async function getProductsByGender(gender: Gender): Promise<Product[]> {
  const q = query(
    collection(db, PRODUCTS_COL),
    where("gender", "==", gender)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

export async function getProductById(id: string): Promise<Product | null> {
  const ref = doc(db, PRODUCTS_COL, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Product;
}

export async function addProduct(
  product: Omit<Product, "id">
): Promise<string> {
  const docRef = await addDoc(collection(db, PRODUCTS_COL), {
    ...product,
    createdAt: Date.now(),
  });
  return docRef.id;
}

export async function updateProduct(
  id: string,
  data: Partial<Product>
): Promise<void> {
  await updateDoc(doc(db, PRODUCTS_COL, id), data);
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, PRODUCTS_COL, id));
}