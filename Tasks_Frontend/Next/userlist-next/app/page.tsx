'use client'

import { useEffect, useState } from "react"
import { User } from "./(helpers)/types";
import axios from "axios";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [editData, setEditData] = useState<Partial<User>>({});
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    axios
    .get("/api/users")
    .then(response => {
      setUsers(response.data)
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  const editUser = async (id: string, data: Partial<User>) => {
    const oldUsers = users;

    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, ...data } : user
      )
    );

    try {
      await axios
        .patch("/api/users", {
          id: id,
          ...data
        });

      setEditId(null);

    } catch (error) {
      setUsers(oldUsers)
    }

  }

  const deleteUser = async (id: string) => {
    const oldUsers = users;

    setUsers(prev =>
      prev.filter(user =>
        user.id !== id
      )
    );

    try {
      await axios
        .delete("/api/users",  { data: { id }});

    } catch (error) {
      setUsers(oldUsers);
    }
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <div
        className="
      p-8
      rounded-3xl
      border border-yellow-500/20
      bg-black/30
      backdrop-blur-xl
      shadow-[0_8px_32px_rgba(255,193,7,0.15)]
    "
      >
        <h1 className="text-4xl font-bold text-yellow-300 mb-8">
          Users
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-yellow-300">
                <th className="text-left px-4 py-3 font-semibold">Id</th>
                <th className="text-left px-4 py-3 font-semibold">First Name</th>
                <th className="text-left px-4 py-3 font-semibold">Last Name</th>
                <th className="text-left px-4 py-3 font-semibold">Position</th>
                <th className="text-left px-4 py-3 font-semibold">Salary</th>
                <th className="text-center px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="
                    bg-zinc-900/50
                    border border-yellow-500/10
                    hover:bg-zinc-800/60
                    transition-all
                  "
                >
                  <td className="px-4 py-4 rounded-l-2xl text-white">
                      {`#${user.id.slice(0, 5)}`}
                  </td>

                  <td className="px-4 py-4 text-white">
                    {editId === user.id ? (
                      <input
                        type="text"
                        value={editData?.firstName}
                        onChange={(e) => setEditData({ ...editData, firstName: e.target.value })
                        }
                        className="bg-zinc-800 px-2 py-1 rounded"
                      />
                    ) : (user.firstName)}
                  </td>

                  <td className="px-4 py-4 text-white">
                    {editId === user.id ? (
                      <input
                        type="text"
                        value={editData?.lastName}
                        onChange={(e) => setEditData({ ...editData, lastName: e.target.value })
                        }
                        className="bg-zinc-800 px-2 py-1 rounded"
                      />
                    ) : (user.lastName)}
                  </td>

                  <td className="px-4 py-4 text-yellow-200">
                    {editId === user.id ? (
                      <input
                        type="text"
                        value={editData?.position}
                        onChange={(e) => setEditData({ ...editData, position: e.target.value })
                        }
                        className="bg-zinc-800 px-2 py-1 rounded"
                      />
                    ) : (user.position)}
                  </td>

                  <td className="px-4 py-4 text-green-400">
                    {editId === user.id ? (
                      <input
                        type="number"
                        value={editData?.salary}
                        onChange={(e) =>
                          setEditData({ ...editData, salary: Number(e.target.value) })
                        }
                        className="bg-zinc-800 px-2 py-1 rounded text-white"
                      />
                    ) : (
                      `$${user.salary.toLocaleString()}`
                    )}
                  </td>

                  <td className="px-4 py-4 rounded-r-2xl">
                    <div className="flex justify-center gap-2">
                      {editId === user.id ? (
                        <>
                          <button
                            onClick={() => editUser(user.id, editData)}
                            className="px-4 py-2 rounded-lg bg-green-500/15 text-green-300"
                          >
                            Save
                          </button>

                          <button
                            className="px-4 py-2 rounded-lg bg-red-500/15 text-red-300"
                            onClick={() => setEditId(null)}
                          >
                            Cancel
                          </button>
                        </>

                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditId(user.id);
                              setEditData({ ...editData })
                            }}
                            className="
                          px-4 py-2
                          rounded-lg
                          bg-yellow-500/15
                          text-yellow-300
                          hover:bg-yellow-500/25
                          transition
                        "
                          >
                            Edit
                          </button>

                          <button
                          onClick={() => deleteUser(user.id)}
                            className="
                              px-4 py-2
                              rounded-lg
                              bg-red-500/15
                              text-red-300
                              hover:bg-red-500/25
                              transition
                            "
                          >
                            Delete
                          </button>
                        </>
                      )}


                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}