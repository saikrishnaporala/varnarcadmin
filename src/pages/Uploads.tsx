// src/components/DataImport.tsx
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import React, { useState } from "react";
import {
  ArrowRight,
  Calculator,
  Menu,
  Shield,
  TrendingUp,
  X,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  FileText,
  Coins,
  Globe,
  CheckCircle,
  Zap,
  Star,
  BarChart3,
  ChevronRight,
  Clock,
  Target,
  User,
} from "lucide-react";

const Uploads: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [tableName, setTableName] = useState("");
  const [ifExists, setIfExists] = useState("append");
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("auto");

  const [uploadResult, setUploadResult] = useState<string>("");
  const [urlResult, setUrlResult] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setUploadResult("Please select a file.");
      return;
    }

    setUploadResult("Uploading...");

    const form = new FormData();
    form.append("file", file);

    const qs = new URLSearchParams();
    if (tableName) qs.set("tableName", tableName.trim());
    if (ifExists) qs.set("ifExists", ifExists);

    try {
      const res = await fetch(`/upload?${qs.toString()}`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      setUploadResult(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
      setUploadResult("Upload failed");
    }
  };

  const handleImportUrl = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!fileUrl) {
      setUrlResult("Please enter at least one file URL.");
      return;
    }
  
    // Split by comma or newline, remove empty spaces
    const urls = fileUrl
      .split(/[\n,]+/) // split by commas or newlines
      .map(u => u.trim())
      .filter(u => u.length > 0);
  
    if (urls.length === 0) {
      setUrlResult("No valid URLs provided.");
      return;
    }
  
    setUrlResult("Downloading and importing...");
  
    try {
      const results: any[] = [];
  
      for (const url of urls) {
        const qs = new URLSearchParams();
        if (tableName) qs.set("tableName", tableName.trim());
        if (ifExists) qs.set("ifExists", ifExists);
        qs.set("fileUrl", url);
        if (fileType) qs.set("fileType", fileType);
  
        const res = await fetch(`${API_BASE_URL}/upload?${qs.toString()}`, {
          method: "POST",
        });
  
        const data = await res.json();
        results.push({ url, result: data });
      }
  
      setUrlResult(JSON.stringify(results, null, 2));
    } catch (err) {
      console.error(err);
      setUrlResult("Import failed");
    }
  };
  

  return (
    <div className="p-4 space-y-4 flex-shrink-0">
      <div className="min-h-screen text-black flex flex-col gap-6">
        <section className="py-0 px-0 group border-0 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Upload CSV / Excel */}
              <form
                onSubmit={handleUpload}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6"
              >
                <h2 className="text-lg font-semibold mb-4">Upload CSV / Excel</h2>

                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-black-300 
                            file:mr-4 file:py-2 file:px-4
                            file:rounded file:border-0
                            file:text-sm file:font-semibold
                            file:bg-light-700 file:text-black
                            hover:file:bg-gray-600 mb-4"
                />

                <input
                  type="text"
                  placeholder="derived from filename"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  className="w-full mb-4 p-2 rounded bg-light-700 text-black placeholder-gray-400"
                />

                <select
                  value={ifExists}
                  onChange={(e) => setIfExists(e.target.value)}
                  className="w-full mb-4 p-2 rounded bg-light-700 text-black"
                >
                  <option value="append">append</option>
                  <option value="replace">replace</option>
                  <option value="skip">skip</option>
                </select>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold"
                >
                  Import
                </button>

                {uploadResult && (
                  <pre className="mt-4 p-2 bg-light-700 rounded text-sm whitespace-pre-wrap">
                    {uploadResult}
                  </pre>
                )}
              </form>

              {/* Import from URL */}
              <form
                onSubmit={handleImportUrl}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6"
              >
                <h2 className="text-lg font-semibold mb-4">Import from URL</h2>
                <textarea 
                  id="urls" 
                  className="w-full mb-4 p-2 rounded bg-light-700 text-black placeholder-gray-400"
                  rows={4} 
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  placeholder="Paste multiple Google Sheet URLs, separated by commas"
                ></textarea>
                {/* <input
                  type="url"
                  placeholder="https://..."
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="w-full mb-4 p-2 rounded bg-light-700 text-black placeholder-gray-400"
                /> */}

                <input
                  type="text"
                  placeholder="derived from filename"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  className="w-full mb-4 p-2 rounded bg-light-700 text-black placeholder-gray-400"
                />

                <div className="flex gap-4 mb-4">
                  <select
                    value={ifExists}
                    onChange={(e) => setIfExists(e.target.value)}
                    className="flex-1 p-2 rounded bg-light-700 text-black"
                  >
                    <option value="append">append</option>
                    <option value="replace">replace</option>
                    <option value="skip">skip</option>
                  </select>

                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    className="flex-1 p-2 rounded bg-gray-700 text-white"
                  >
                    <option value="auto">auto</option>
                    <option value="csv">CSV</option>
                    <option value="xlsx">XLSX</option>
                    <option value="xls">XLS</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold"
                >
                  Import
                </button>

                {urlResult && (
                  <pre className="mt-4 p-2 bg-light-700 rounded text-sm whitespace-pre-wrap">
                    {urlResult}
                  </pre>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Uploads;
