// src/pages/AllRecords.tsx
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/components/ui/use-toast";

interface TableRow {
  [key: string]: any;
  _id?: string;
}

interface Column {
  Field?: string;
  name?: string;
  Type?: string;
  type?: string;
}

const visibleColumns = ["id", "name", "status", "folder_path"];

export default function AllRecords() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<TableRow[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [searchText, setSearchText] = useState("");
  const { toast } = useToast();

  const fetchTables = async () => {
    setLoading(true);
    try {
      const [rowsRes, colsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/tables/files/rows?limit=5000&status=pending`),
        fetch(`${API_BASE_URL}/api/tables/files/columns`)
      ]);
      const rowsData = await rowsRes.json();
      const colsData = await colsRes.json();
      setRows(rowsData.rows || []);
      setColumns(colsData.columns || []);
    } catch {
      setRows([]);
      setColumns([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/files/${id}/upload`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log("Upload success:", data);

      setRows((rows) =>
        rows.map((file) =>
          file.id === id
            ? { ...file, status: "Processed", fileId: id }
            : file
        )
      );

      toast({
        title: "Upload Successful",
        description: `File #${id} uploaded successfully.`,
      });
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload Failed",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const customStyles = {
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#111827",
      },
    },
  };

  useEffect(() => {
    fetchTables();
  }, []);

  // ✅ modal helper
  function openModal(title: string, content: React.ReactNode) {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  }

  // ✅ filter rows with search
  const filteredRows = rows.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4 flex-shrink-0">
      <section className="card">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Google Links Tables</h3>
        </div>

        {loading && <p className="text-muted-foreground">Loading...</p>}

        <div className="space-y-4 mt-4">
          {/* ✅ Search Input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border rounded-md px-3 py-2 w-64"
          />

          <div className="mt-4 overflow-x-auto">
            <DataTable
              columns={[
                ...visibleColumns.map((col) => ({
                  name: col.replace(/_/g, " ").toUpperCase(),
                  selector: (row: TableRow) => row[col],
                  sortable: true,
                })),
                {
                  name: "Actions",
                  cell: (row: TableRow) => (
                    <div className="space-x-1">
                      <div className="inline-flex rounded-md shadow-xs" role="group">
                        {/* View Button */}
                        <Button
                          type="button"
                          className="btn-icon-custom"
                          onClick={() =>
                            openModal(
                              `View row #${row._id}`,
                              <pre>{JSON.stringify(row, null, 2)}</pre>
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </Button>

                        {/* Upload Button */}
                        {String(row.status).toLowerCase() !== "processed" && (
                          <Button
                            type="button"
                            className="btn-icon-custom text-blue-600"
                            onClick={() => handleUpload(row.id)}
                          >
                            <FontAwesomeIcon icon={faUpload} />
                          </Button>
                        )}
                      </div>
                    </div>
                  ),
                },
              ]}
              data={filteredRows}
              pagination
              customStyles={customStyles}
              defaultSortFieldId="status"
              defaultSortAsc={true}
            />
          </div>
        </div>
      </section>

      {/* ✅ Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
          </DialogHeader>
          <div className="mt-2">{modalContent}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
