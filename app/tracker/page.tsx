"use client";

import React, { useState } from "react";

type Application = {
  company: string;
  role: string;
  status: string;
};

export default function TrackerPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApplication: Application = { company, role, status };
    setApplications([...applications, newApplication]);
    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-zinc-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-semibold">📋 Job Application Tracker</h1>

        <form
          onSubmit={handleSubmit}
          className="mb-10 rounded-lg border border-zinc-200 p-6 shadow-sm"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 mb-1">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-md border border-zinc-300 p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 mb-1">Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-md border border-zinc-300 p-2"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-md border border-zinc-300 p-2"
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offered">Offered</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Add Application
          </button>
        </form>

        <h2 className="mb-4 text-2xl font-semibold">Your Applications</h2>
        {applications.length === 0 ? (
          <p className="text-zinc-500">No applications logged yet.</p>
        ) : (
          <ul className="space-y-4">
            {applications.map((app, index) => (
              <li
                key={index}
                className="rounded-md border border-zinc-200 p-4 shadow-sm"
              >
                <p>
                  <strong>Company:</strong> {app.company}
                </p>
                <p>
                  <strong>Role:</strong> {app.role}
                </p>
                <p>
                  <strong>Status:</strong> {app.status}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
