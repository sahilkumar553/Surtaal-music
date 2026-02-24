/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_USER_ID: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  readonly VITE_INQUIRY_NOTIFY_EMAIL?: string;
  readonly VITE_CLOUDINARY_CLOUD_NAME?: string;
  readonly VITE_CLOUDINARY_UPLOAD_PRESET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
