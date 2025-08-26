// src/pages/AllRecords.tsx
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faEye, faToggleOn, faTrash } from "@fortawesome/free-solid-svg-icons";

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

export default function AllRecords() {
  const [tables, setTables] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [rows, setRows] = useState<TableRow[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState("");

  const fetchTables = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE_URL+"/api/tables");
      const data = await res.json();
      setTables(data.tables || []);
    } catch {
      setTables([]);
    } finally {
      setLoading(false);
    }
  };

  const previewTable = async (t: string) => {
    setSelectedTable(t);
    const [rowsRes, colsRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/tables/${encodeURIComponent(t)}/rows?limit=50`),
      fetch(`${API_BASE_URL}/api/tables/${encodeURIComponent(t)}/columns`)
    ]);
    const rowsData = await rowsRes.json();
    const colsData = await colsRes.json();
    setRows(rowsData.rows || []);
    setColumns(colsData.columns || []);
  };

  const dropTable = async (t: string) => {
    if (!window.confirm(`Drop table ${t}?`)) return;
    await fetch(`${API_BASE_URL}/api/tables/${encodeURIComponent(t)}`, { method: "DELETE" });
    fetchTables();
  };

  const openModal = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };

  const customStyles = {
    headCells: {
      style: {
        fontSize: "16px",   // make font larger
        fontWeight: "bold", // make font bold
        color: "#111827",   // optional: dark gray/black text
      },
    },
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div className="p-4 space-y-4 flex-shrink-0">
      <section className="card">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Tables</h3>
          <Button onClick={fetchTables}>Refresh</Button>
        </div>

        {loading && <p className="text-muted-foreground">Loading...</p>}
        {!loading && tables.length === 0 && (
          <p className="text-muted-foreground">No tables yet</p>
        )}

        <div className="space-y-4 mt-4">
          {tables.map((t) => (
            <div key={t} className="border p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <strong>{t}</strong>
                <div className="space-x-2">
                  <Button size="sm" onClick={() => previewTable(t)}>Preview</Button>
                  <Button size="sm" variant="secondary">Schema</Button>
                  <Button size="sm" variant="destructive" onClick={() => dropTable(t)}>Drop</Button>
                </div>
              </div>
              {selectedTable === t && rows.length > 0 && (
                <div className="mt-4 overflow-x-auto">
                  <DataTable
                    columns={[
                      ...(
                        columns.length
                          ? columns.map((c) => ({
                              name: c.Field || c.name,
                              selector: (row: TableRow) => row[c.Field || c.name || ""],
                            }))
                          : Object.keys(rows[0] || {}).map((key) => ({
                              name: key,
                              selector: (row: TableRow) => row[key],
                            }))
                      ),
                      {
                        name: "Actions",
                        cell: (row: TableRow) => (
                          <div className="space-x-1">
                            <div className="inline-flex rounded-md shadow-xs" role="group">
                              <Button type="button" className="btn-icon-custom " onClick={() =>
                                openModal(`View row #${row._id}`, <pre>{JSON.stringify(row, null, 2)}</pre>)
                              }>
                                <FontAwesomeIcon icon={faEye} />
                              </Button>
                              <Button type="button" className="btn-icon-custom text-blue-600">
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </Button>
                              <Button type="button" className="btn-icon-custom text-red-600">
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </div>
                          </div>
                        )
                      }
                    ]}
                    data={rows}
                    pagination
                    customStyles={customStyles}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

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
