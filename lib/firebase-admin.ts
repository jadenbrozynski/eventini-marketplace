import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK with proper service account
const firebaseAdminConfig = {
  credential: cert({
    projectId: "eventini-746af",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC4ve6AdcMyTrT0\n788r3VyZjd1Idk8/5OcNrWnmLEkQdOVrxWBQVYax5OKqq4YpWCeUlGpi/EIs+/2u\njXl0H9rS9zZQdCjNx70XwbJWKpLW+pkzVSbTWiiiO7904DnbozOPf7+TzCYXlgVh\nTR3tAqNz+qnoSDES9xU5VbVvKdoUjHTIHepS4SFoAoS1vz79kaQPavQC9owGSsjZ\nrKwlhw9c2jSycf1E19ADGgihP1f2jTOC2m2AzUXnQO7nKQ6amsbBf6GPa1cDnOBJ\ngK6iqNWGC8NgLLPlbNUvzN8GzX4W2McSI8RAI1S7nXdrMQkpRrd6izyuiZyMtxMj\nqwyzhTUBAgMBAAECggEAAu4kS85SX8hmz2HEX/Y9Y0QgR+d0f1dyoMFo5hk6uXOZ\nNfnl+rA4mDbAr6NT1/EJg65M96/3nr4KeovM6t4ceu8n4ePNx+HMqoVMflhjhtxn\ntKw7luudrGEVOtXZpRW0GikVEVOSIRqkkDQIbvt1O0A1FLWcbagUopms7Iv15RCE\nTrnCRkt1JZl8qf1Y6B2DYmKvgKi47Kc62niQ7v1b4UnP0Q6GnsUepaMDWK2YGVwJ\nk+uh77m8vi53hiBesYd/pPq8VGEAVlJGTR1HXm1LcuSGOF0Ycgo3bhrVrGm1fOSL\nZJH1hzCOehFc+lbsNfyVV/9yy5ABArHK/eusPP0bPwKBgQD3jtl1IwtCHFpAU5Ku\nwSc89w6C2kqJaRmJaWeHkU0RCILlSj6QbmEPDilYXsojLymQ6eZv9iiSD7pW5lnT\nSZ70JoocUGCIfn3XiqHXhGa8V5Vc4d/oCzFzQgpK5LABLwhEt/X+pSBep9RNQ3Hg\nW0uyVEVqJ2g1qIt9pZaS+YxcfwKBgQC/CrSifNyJNZU9P1LiYIOlTcjz2DVo2P+f\nT+e0wfYN7nXSdMyvoLequqhJ4us5tzmJu/69DZ4PmSrOh4vrrA6epbORCgMeeqCL\nDQrN1RM2z6eA/sa/gWkyUa5wXOFMfOyjFAcVPOorfNw9UId9TF5ux8Fg/mAu8Ek2\nv4w/cXuufwKBgQC9CPvMkqH6LaRNEoQjpaLMzurpyL66BuNVJoPD5ZQvuYwagoMb\nzu2WjX3M2TUJgO4Alls8i3+XaSMlUGivCryyOuuji0zrbYuyl03WQGgi0c5gSqqr\nikCMfpVVcyNjBAMQVlklxfndzdIz3ZiLdatr1SXcVZMhxj4eB9/fA2fHCQKBgQCJ\nZYuwaRi7XdwtpoNX6I4Fr0HdjhwrghWmYHOGnxD1yBDZAcPMdExj78blDNycL9ij\n5J87HLYXBdOxoe7R2nbRRt80avz/SLZ6CzFABATDoOkZbyNFzC76T6Cjk0k+F4Kh\nbuABOEQ6bpx/RJGNXgV0qxm7Rneqioo9Y9ncLyQCxQKBgDb0fQ/IBnnDXA6ND+cn\nF/qJ2IxfMa+iKWcxAIEmiIxWbjeXyTytFMssJgellnm+rGRJpXgGcN6xVZ8j1zqZ\n34seeRbYdS34SkzXr615jnHxT7o1ZhDQFpTmYiuFvVUeg8XGtkHAQ2a7m9V7F7wZ\nzdRm1+TRKX74FYgV8w6/4jaQ\n-----END PRIVATE KEY-----\n",
    clientEmail: "firebase-adminsdk-fbsvc@eventini-746af.iam.gserviceaccount.com",
  }),
};

// Initialize Firebase Admin SDK
const app = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];

// Initialize Firestore
export const adminDb = getFirestore(app);

export default app;
