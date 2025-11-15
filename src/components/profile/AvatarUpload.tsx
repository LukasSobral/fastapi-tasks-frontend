    import { useState, useRef } from "react";
    import { Button } from "../ui/button";

    export default function AvatarUpload({ currentImage, onSelect }: any) {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    function openFilePicker() {
        fileRef.current?.click();
    }

    function handleFileChange(e: any) {
        const file = e.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPreview(url);
        onSelect(file);
    }

    return (
        <div className="flex flex-col items-center gap-3">
        {/* Avatar */}
        <div className="relative">
            <img
            src={preview ?? currentImage ?? "https://via.placeholder.com/150"}
            className="w-28 h-28 rounded-full object-cover shadow-md border"
            />
        </div>

        <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
        />

        <Button variant="secondary" onClick={openFilePicker}>
            Alterar Foto
        </Button>
        </div>
    );
    }
