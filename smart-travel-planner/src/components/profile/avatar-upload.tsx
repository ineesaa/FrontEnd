"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { uploadAvatar } from "@/actions/upload.actions";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB, kept in sync with the server action

interface AvatarUploadProps {
  name?: string | null;
  email?: string | null;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function AvatarUpload({
  name,
  email,
  value,
  onChange,
  error,
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }

    const localPreviewUrl = URL.createObjectURL(file);
    setPreview(localPreviewUrl);
    setIsUploading(true);

    const formData = new FormData();
    formData.set("file", file);

    const result = await uploadAvatar(formData);

    setIsUploading(false);
    URL.revokeObjectURL(localPreviewUrl);
    setPreview(null);

    if (!result.success) {
      toast.error("Upload failed", { description: result.error });
      return;
    }

    onChange(result.url);
    toast.success("Photo updated.");
    router.refresh();
  }

  return (
    <div className="flex items-start gap-4">
      <div className="relative">
        <Avatar
          src={preview ?? (value || null)}
          name={name}
          email={email}
          size="lg"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          aria-label="Upload a new photo"
          className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card transition-colors hover:bg-muted disabled:opacity-50"
        >
          <Camera className="h-3.5 w-3.5" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <div className="flex-1 space-y-1.5">
        <Label htmlFor="image">Or paste an image link</Label>
        <Input
          id="image"
          placeholder="https://example.com/your-photo.jpg"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {error && <p className="text-xs text-danger">{error}</p>}
        <p className="text-xs text-muted-foreground">
          {isUploading
            ? "Uploading…"
            : "Tap the camera icon to upload from your device, or paste a link."}
        </p>
      </div>
    </div>
  );
}
