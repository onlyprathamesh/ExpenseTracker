import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";

function ExpenseTable() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [error, setError] = useState("");

  // 🔁 Reset modal
  function onCloseModal() {
    setOpenModal(false);
    setCategory("");
    setAmount("");
    setComment("");
    setIsEditing(false);
    setSelectedExpenseId(null);
  }

  // 🔁 Load all expenses
  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:8080/expense", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 401) {
        navigate("/login", {
          state: {
            alert: {
              message: "Session expired. Please login again.",
              type: "warning",
            },
          },
        });
        return;
      }

      const data = await res.json();
      setExpenses(data.expenses || []);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [navigate]);

  // 🔁 Add or Edit handler
  const handleSave = async () => {
    const payload = {
      category,
      amount,
      comments: comment,
    };

    if (!amount || !category) {
        setError("Amount and Category are required.");
        return;
    }

    setError("");

    try {
      const url = isEditing
        ? `http://localhost:8080/expense/${selectedExpenseId}`
        : "http://localhost:8080/expense";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.log("Failed to save expense.");
        throw new Error("Failed to save expense.");
    }
    
      await fetchExpenses();
      onCloseModal();
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteExpense = async (expenseId) => {
    try {
        const res = await fetch(`http://localhost:8080/expense/${expenseId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        });

        if (res.status === 200) {
            return { success: true };
        } else {
            const data = await res.json();
            return { success: false, message: data.msg || "Failed to delete expense" };
        }
        } catch (err) {
            console.error("Delete error:", err);
            return { success: false, message: "Server error" };
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Do you really want to delete?");
        if (!confirmDelete) return;
        const result = await deleteExpense(id);
        if (result.success) {
            await fetchExpenses();
        } else {
            alert(result.message)
        }
    };

    const sortedExpenses = [...expenses].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const totalAmount = sortedExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <>
      <div>
        <div>
          <Button
            className="my-2 bg-gray-800 text-white hover:bg-gray-500 hover:text-black focus:ring-2 focus:ring-gray-500"
            color="none"
            onClick={() => {
              setIsEditing(false);
              setSelectedExpenseId(null);
              setOpenModal(true);
            }}
          >
            Add Expense
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>Category</TableHeadCell>
                <TableHeadCell>Amount</TableHeadCell>
                <TableHeadCell>Comments</TableHeadCell>
                <TableHeadCell>Created At</TableHeadCell>
                <TableHeadCell>Updated At</TableHeadCell>
                <TableHeadCell>Edit</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody className="divide-y">
              {sortedExpenses.map((expense, index) => (
                <TableRow
                  key={expense._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    {expense.category}
                  </TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.comments}</TableCell>
                  <TableCell>
                    {new Date(expense.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(expense.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      onClick={(e) => {
                        e.preventDefault();
                        setCategory(expense.category);
                        setAmount(expense.amount);
                        setComment(expense.comments);
                        setSelectedExpenseId(expense._id);
                        setIsEditing(true);
                        setOpenModal(true);
                      }}
                    >
                      Edit
                    </a>
                  </TableCell>
                  <TableCell>
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      onClick={(e) => {e.preventDefault(); handleDelete(expense._id)}}
                    >
                      Delete
                    </a>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-100 dark:bg-gray-700 font-semibold">
                <TableCell className="text-black dark:text-white">Total</TableCell>
                <TableCell className="text-black dark:text-white">₹{totalAmount}</TableCell>
                <TableCell colSpan={5}></TableCell>
                </TableRow>

            </TableBody>
          </Table>
        </div>
      </div>

      {/* ➕ Add/Edit Modal */}
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        {error && <div className="flex justify-center"><p className="text-red-500 text-sm py-5">{error}</p></div>}
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {isEditing ? "Edit Expense" : "Add Expense"}
            </h3>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="category">Category</Label>
              </div>
              <TextInput
                id="category"
                placeholder="e.g., Food, Travel"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="amount">Amount</Label>
              </div>
              <TextInput
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="comment">Comment</Label>
              </div>
              <TextInput
                id="comment"
                placeholder="Optional comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="w-full justify-center flex">
              <Button onClick={handleSave}>
                {isEditing ? "Update Expense" : "Add Expense"}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ExpenseTable;
