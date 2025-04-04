"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";
import { desc, eq } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { Trash } from "lucide-react";
import { toast } from "sonner"; // Import toast for notifications
import { useRouter } from "next/navigation"; // Import router for navigation

const Dashboard = () => {
  const { user } = useUser();
  const router = useRouter(); // Use router for navigation
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if (user) {
      getAllExpenses();
    }
  }, [user]);

  const getAllExpenses = async () => {
    try {
      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
        })
        .from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.id));

      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const result = await db
        .delete(Expenses)
        .where(eq(Expenses.id, id))
        .returning();

      if (result.length > 0) {
        toast.success("Expense Deleted!"); // Show success message
        getAllExpenses(); // Refresh the list
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense!"); // Show error message
    }
  };

  return (
    <div className="p-10">
      <button
        className="text-xl font-bold mb-4 flex items-center"
        onClick={() => router.back()}
      >
        <h2 className="font-bold text-3xl">← My Expenses</h2>
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {expensesList.map((expense) => (
              <tr key={expense.id} className="border-b">
                <td className="p-4">{expense.name}</td>
                <td className="p-4">₹{expense.amount}</td>
                <td className="p-4">{new Date(expense.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
