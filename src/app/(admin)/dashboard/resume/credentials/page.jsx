// src/app/admin/dashboard/resume/credentials/page.jsx
"use client";
import CredentialForm from "../../../../../components/admin/CredentialForm";
import { useState, useEffect } from "react";
import { db } from "./../../../../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function AdminCredentialsPage() {
  const [credentials, setCredentials] = useState([]);

  const fetchCredentials = async () => {
    const querySnapshot = await getDocs(collection(db, "credentials"));
    setCredentials(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    );
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "credentials", id));
    fetchCredentials();
  };

  return (
    <div className="p-8 text-white min-h-screen bg-[#12141d]">
      <h1 className="text-2xl font-black mb-8 uppercase tracking-widest">
        Manage Credentials
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section>
          <h2 className="text-sm font-bold mb-4 uppercase text-zinc-500">
            Add New Credential
          </h2>
          <CredentialForm onSave={fetchCredentials} />
        </section>

        <section>
          <h2 className="text-sm font-bold mb-4 uppercase text-zinc-500">
            Current Records
          </h2>
          <div className="space-y-4">
            {credentials.map((cred) => (
              <div
                key={cred.id}
                className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col gap-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-bold">{cred.title}</h3>
                    <p className="text-fuchsia-500 text-xs font-mono uppercase">
                      {cred.issuer} • {cred.date}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(cred.id)}
                    className="text-red-500 hover:text-red-300 text-xs uppercase"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-zinc-400 text-sm">{cred.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
