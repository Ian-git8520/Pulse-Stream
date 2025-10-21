import React, { useEffect } from "react";

export default function UploadWidget({ onUpload }) {
  useEffect(() => {
    if (!window.cloudinary) {
      console.warn("Cloudinary script not loaded");
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "doehtbdil",
        uploadPreset: "pulsestream_preset",
        sources: ["local", "camera", "url"],
        multiple: false,
        resourceType: "auto",
        folder: "pulsestream_uploads",
        clientAllowedFormats: ["png", "jpg", "jpeg", "gif", "mp4", "mov", "webm"],
        maxFileSize: 50000000
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const info = result.info;
          onUpload(info.secure_url, info.resource_type === "video" ? "video" : "image");
        }
      }
    );

    const el = document.getElementById("open_cloud_widget");
    if (el) {
      const handler = () => widget.open();
      el.addEventListener("click", handler);
      return () => el.removeEventListener("click", handler);
    }
  }, [onUpload]);

  return (
    <button id="open_cloud_widget" type="button" className="btn btn-outline-primary w-100">
      Upload Photo/Video
    </button>
  );
}
